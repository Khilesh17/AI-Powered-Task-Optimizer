# Tech Context: TaskNova (Simplified MVP Focus)

## 1. Selected Technology Stack (MVP)

This stack is chosen for simplicity, rapid development for the MVP, and core ML capabilities, while maintaining the dark-mode UI requirement.

### 1.1. Frontend

* **Framework:** React with Vite (Vite for fast build tooling, React for broad ecosystem).
* **UI Styling:** Tailwind CSS (DaisyUI can still be used if desired, or another React component library like Material UI, Chakra UI, or Mantine, adapted for dark mode).
* **State Management:** Zustand or Redux Toolkit (Zustand for simplicity, Redux Toolkit for more complex state).
* **Data Fetching:** TanStack Query (React Query) or native `fetch`.
* **Routing:** React Router (`react-router-dom`) for multi-page/section navigation.
* **Common UI Components:** 
    - `Button.tsx`: Reusable button with variants (primary, secondary, danger).
    - `ConfirmationModal.tsx`: Reusable modal for user confirmations.
* **Media Capture (for 10s analysis):** 
    - Video frames (as current).
    - Audio: `MediaRecorder` API for capturing microphone input.
    - Text: Optional `<textarea>` for user input during the analysis period.

### 1.2. Backend

* **Language/Framework:** Python with FastAPI (Reverted to Python for stronger Computer Vision library support for facial detection).
* **API Type:** RESTful APIs.
    - Emotion Analysis Endpoints:
        - `POST /api/v1/analyze_face_emotion` (existing, for single frames)
        - `POST /api/v1/analyze_voice_emotion` (new, accepts audio file)
        - `POST /api/v1/analyze_text_emotion` (new, accepts text input)
    - Task Management Endpoints:
        - `POST /api/v1/tasks` (Create a new task)
        - `GET /api/v1/tasks` (List all tasks - for potential admin/debug)
        - `GET /api/v1/tasks/suggestion?emotion={emotion}` (Get all task suggestions for a given emotion; returns a list)
        - `DELETE /api/v1/tasks/{task_id}` (Delete a specific task)

### 1.3. Task Storage (MVP)

* **Method:** Local JSON file (`tasks.json`) in the backend directory.
* **Structure:** An array of task objects. Each object will contain:
    - `id`: String (e.g., UUID, or simple incrementing integer managed by the app)
    - `description`: String
    - `associated_emotions`: Array of strings (e.g., ["happy", "neutral"])
    - `created_at`: String (ISO 8601 timestamp)

### 1.4. Machine Learning & AI (MVP)

* **Emotion Detection - Facial:** Using `deepface` on the backend for per-frame analysis.
* **Emotion Detection - Voice (for 10s analysis):** Backend service using a Speech Emotion Recognition (SER) model (e.g., from Hugging Face Transformers,  `librosa` for processing). Accepts an audio clip.
* **Emotion Detection - Text (for 10s analysis):** Backend service using an NLP model for sentiment/emotion from text (e.g., NLTK, spaCy, or Hugging Face Transformers). Accepts user-typed text.
* **Multi-Modal Analysis (10s period):** 
    - **Frontend:** Provides two modes:
        1. **Single Frame Analysis:** Captures one video frame, sends to `/api/v1/analyze_face_emotion`.
        2. **Continuous Multi-Modal Analysis (10s):** 
            - Captures video frames periodically, sends each to `/api/v1/analyze_face_emotion`.
            - Captures a 10-second audio clip using `MediaRecorder`, sends to `/api/v1/analyze_voice_emotion`.
            - Accepts optional typed text, sends to `/api/v1/analyze_text_emotion`.
    - **Result Aggregation (Frontend/Backend TBD, initially Frontend):** 
        - Collects dominant facial emotions from frames.
        - Collects emotion from voice.
        - Collects emotion from text.
        - Initial strategy: Display individual results, then determine an overall dominant emotion (e.g., based on frequency or a simple rule-set) for task suggestion.
    Focus on basic emotion classification for all modalities.

### 1.5. Infrastructure & Deployment (Initial)

* **Containerization:** Docker (for local development consistency).
* **Deployment:** Focus on local development first. Simple cloud deployment (e.g., Heroku, Vercel for frontend, basic VPS for backend) can be considered post-MVP if needed.
* **CI/CD:** Not a priority for the initial simple MVP.

## 2. Technical Constraints & Considerations (MVP Focus)

* **Data Privacy & Security:** Basic secure practices for data handling. Full compliance measures (GDPR etc.) are for future scope beyond initial MVP, but good principles will be followed.
* **Real-time Processing:** Frontend will capture multiple frames/audio over a short period (e.g., 10 seconds). Backend processing for each modality should be responsive. The overall user experience is near real-time for the analysis period.
* **Scalability:** MVP will not be designed for high scalability; focus is on a working simple version.
* **Model Accuracy & Bias:** Use standard pre-trained models. In-depth bias analysis is beyond MVP scope.
* **Integration:** No third-party integrations for MVP.
* **Cross-Platform Compatibility:** Web application should be responsive for modern desktop browsers.
* **Dark Mode UX:** UI will be dark mode by default.

## 3. Current Focus (Refactoring & Feature Expansion)

* **Code Refactoring:** Improve code readability and maintainability by organizing code into a better folder structure (both frontend and backend).
* **Frontend Enhancements:** 
    - Implement a header and navigation structure.
    - Create distinct sections/pages using React Router:
        - Home: Information about the website, team, and roles.
        - Add Tasks: UI for creating new tasks.
        - Remove Tasks: UI for listing and deleting existing tasks.
        - Give Tasks (Emotion Analysis): The existing facial emotion detection and dynamic task suggestion feature.
    - Ensure the UI is responsive across different screen sizes.
* **Backend Enhancements:** 
    - Implement `DELETE /tasks/{task_id}` endpoint.
    - Refactor backend code into a more organized structure if necessary (e.g., routers, services/models for tasks).
