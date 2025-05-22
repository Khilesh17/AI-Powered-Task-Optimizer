from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

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
