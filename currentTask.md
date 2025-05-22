# Current Task: Implement Task Management & Dynamic Suggestions

 **Date:** 2025-05-22

 **Objective:** To add functionality allowing users to define tasks, associate them with emotions, and receive dynamic task suggestions based on their detected facial emotion.

 **Previous Task Summary (Facial Emotion Detection MVP):** 
* Core facial emotion detection (camera -> backend analysis -> frontend display) was implemented.
* User requested new features: user-defined tasks and dynamic suggestions.
* Memory Bank files (`projectbrief.md`,  `techContext.md`,  `activeContext.md`) updated for these new requirements.

## Task Breakdown & Checklist:

* [x] **1. Task Storage Setup (JSON File):** (Completed 2025-05-22)
    - [x] Created an empty `tasks.json` file in the `/Users/khilesh.katre/Desktop/Major Project/backend/` directory.
    - [x] Defined the structure for task objects within the JSON file (id, description, associated_emotions, created_at).

* [x] **2. Backend API Development (Python/FastAPI in `backend/main.py`):** (Completed 2025-05-22)
    - [x] **JSON File Handling Logic:** 
        - [x] Implemented helper functions in `backend/main.py` to read from and write to `tasks.json`.
        - [x] Basic file read/write implemented.
        - [x] Defined Pydantic models for Task creation and Task response.
    - [x] **Create Task Endpoint (`POST /tasks`):** 
        - [x] Accepts task `description` and `associated_emotions`.
        - [x] Adds new task to `tasks.json`.
        - [x] Returns created task data.
    - [x] **List Tasks Endpoint (`GET /tasks`):** 
        - [x] Reads tasks from `tasks.json` and returns them.
    - [x] **Get Task Suggestion Endpoint (`GET /tasks/suggestion`):** 
        - [x] Accepts `emotion` query parameter.
        - [x] Filters tasks from `tasks.json` based on emotion.
        - [x] Selects one randomly if multiple match.
        - [x] Returns suggested task or "not found" message.
    - [x] CORS settings are in place.

* [x] **3. Frontend UI Development (React/Vite in `frontend/src/App.tsx` and new components):** (Completed 2025-05-22)
    - [x] **Task Creation Component/Section:** 
        - [x] Created a new form/UI section in `App.tsx` for users to input a task description.
        - [x] Provided checkboxes for selecting associated emotions.
        - [x] On submit, calls the `POST /tasks` backend endpoint.
        - [x] Displays success/error messages for task creation.
    - [x] **Modify Emotion Analysis Display:** 
        - [x] After a facial emotion is successfully detected, `App.tsx` gets the `dominant_emotion`.
        - [x] Makes a new API call to `GET /tasks/suggestion?emotion={dominant_emotion}`.
        - [x] Replaces the placeholder task suggestion with the dynamically fetched task.
        - [x] Handles cases where no task is found.
    - [ ] **(Optional for MVP) Task List Display Component/Section:** (Not implemented in this iteration)

## Implementation Notes:

* Focus on a clean separation between backend API logic and frontend presentation.
* For task storage, simple read/write operations on `tasks.json` will be used. Helper functions for these operations should be created in `backend/main.py`.
* Ensure robust error handling on both frontend and backend for API calls and database operations.
* Keep the UI for task creation simple and intuitive.

## Acceptance Criteria:

* User can create new tasks with descriptions and associate them with one or more emotions through the UI.
* Created tasks are stored in the `tasks.json` file.
* When a facial emotion is detected, the application queries the backend for a relevant task.
* A task associated with the detected emotion is suggested to the user in the UI.
* If no task is found for an emotion, an appropriate message is displayed.
