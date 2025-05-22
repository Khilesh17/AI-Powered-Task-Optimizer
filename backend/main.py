from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import os
from deepface import DeepFace
import numpy as np
import cv2 # for image decoding
import json
import uuid
from datetime import datetime, timezone
from typing import List, Dict, Optional
import random

app = FastAPI()

# CORS Middleware configuration
origins = [
    "http://localhost",
    "http://localhost:5173", # Default Vite dev server port for React
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define paths and ensure directories/files exist
TEMP_UPLOAD_DIR = "temp_uploads"
TASKS_FILE_PATH = "tasks.json"
os.makedirs(TEMP_UPLOAD_DIR, exist_ok=True)

# Initialize tasks.json if it doesn't exist or is empty
if not os.path.exists(TASKS_FILE_PATH) or os.path.getsize(TASKS_FILE_PATH) == 0:
    with open(TASKS_FILE_PATH, "w") as f:
        json.dump([], f)

# --- Pydantic Models ---
class EmotionResponse(BaseModel):
    dominant_emotion: str
    emotions: Dict[str, float]

class TaskBase(BaseModel):
    description: str
    associated_emotions: List[str]

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: str
    created_at: datetime

class TaskSuggestionResponse(BaseModel):
    suggested_task: Optional[Task] = None
    message: str


# --- Helper Functions for Task JSON DB ---
def load_tasks() -> List[Dict]:
    try:
        with open(TASKS_FILE_PATH, "r") as f:
            tasks_data = json.load(f)
            # Ensure all tasks have a created_at field for consistency if loading older data
            for task in tasks_data:
                if 'created_at' not in task: # Basic migration for older task formats
                    task['created_at'] = datetime.now(timezone.utc).isoformat()
            return tasks_data
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_tasks(tasks_data: List[Dict]):
    with open(TASKS_FILE_PATH, "w") as f:
        json.dump(tasks_data, f, indent=4)

# --- API Endpoints ---
@app.get("/")
async def root():
    return {"message": "Zidio AI Facial Emotion Detection & Task Optimizer Backend is running!"}

@app.post("/analyze_face_emotion", response_model=EmotionResponse)
async def analyze_face_emotion_endpoint(image_file: UploadFile = File(...)):
    temp_file_path = None
    try:
        if not image_file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

        temp_file_path = os.path.join(TEMP_UPLOAD_DIR, image_file.filename if image_file.filename else "temp_image.jpg")
        
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(image_file.file, buffer)
        
        analysis_result = DeepFace.analyze(
            img_path=temp_file_path,
            actions=['emotion'],
            enforce_detection=True,
            detector_backend='opencv'
        )
        
        if isinstance(analysis_result, list) and len(analysis_result) > 0:
            first_face_analysis = analysis_result[0]
        elif isinstance(analysis_result, dict):
             first_face_analysis = analysis_result
        else:
            raise HTTPException(status_code=400, detail="No face detected or analysis failed.")

        dominant_emotion = first_face_analysis.get("dominant_emotion", "unknown").lower() # Standardize to lowercase
        emotions = first_face_analysis.get("emotion", {})
        serializable_emotions = {k.lower(): float(v) for k, v in emotions.items()} # Standardize keys

        return EmotionResponse(
            dominant_emotion=dominant_emotion,
            emotions=serializable_emotions
        )
    except HTTPException as http_exc:
        raise http_exc
    except ValueError as ve:
        print(f"DeepFace analysis error: {ve}")
        raise HTTPException(status_code=400, detail=f"Could not analyze image: {str(ve)}")
    except Exception as e:
        print(f"Error during facial emotion analysis: {e}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        if image_file: # Check if image_file was successfully assigned
            await image_file.close()

@app.post("/tasks", response_model=Task, status_code=201)
async def create_task_endpoint(task_data: TaskCreate):
    tasks = load_tasks()
    new_task = Task(
        id=str(uuid.uuid4()),
        description=task_data.description,
        associated_emotions=[emotion.lower() for emotion in task_data.associated_emotions], # Standardize to lowercase
        created_at=datetime.now(timezone.utc)
    )
    tasks.append(new_task.model_dump(mode='json')) # Use model_dump for Pydantic v2
    save_tasks(tasks)
    return new_task

@app.get("/tasks", response_model=List[Task])
async def list_tasks_endpoint():
    tasks_data = load_tasks()
    # Validate and parse tasks using Pydantic model for consistent output
    return [Task(**task) for task in tasks_data]


@app.get("/tasks/suggestion", response_model=TaskSuggestionResponse)
async def get_task_suggestion_endpoint(emotion: str = Query(..., description="The detected emotion to get a task for.")):
    normalized_emotion = emotion.lower()
    tasks = load_tasks()
    
    suitable_tasks_data = [
        task_data for task_data in tasks 
        if normalized_emotion in [e.lower() for e in task_data.get("associated_emotions", [])]
    ]
    
    if not suitable_tasks_data:
        return TaskSuggestionResponse(message=f"No specific task found for emotion: {emotion}. Try a general wellness task!")

    # Parse suitable tasks with Pydantic model before returning
    suitable_tasks = [Task(**task_data) for task_data in suitable_tasks_data]
    selected_task = random.choice(suitable_tasks)
    return TaskSuggestionResponse(suggested_task=selected_task, message="Here's a task suggestion for you:")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
