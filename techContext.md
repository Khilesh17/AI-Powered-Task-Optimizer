# Tech Context: TaskNova (Simplified MVP Focus)

## 1. Selected Technology Stack (MVP)

This stack is chosen for simplicity, rapid development for the MVP, and core ML capabilities, while maintaining the dark-mode UI requirement.

### 1.1. Frontend
- **Framework:** React with Vite (Vite for fast build tooling, React for broad ecosystem).
- **UI Styling:** Tailwind CSS (DaisyUI can still be used if desired, or another React component library like Material UI, Chakra UI, or Mantine, adapted for dark mode).
- **State Management:** Zustand or Redux Toolkit (Zustand for simplicity, Redux Toolkit for more complex state).
- **Data Fetching:** TanStack Query (React Query) or native `fetch`.
- **Routing:** React Router (`react-router-dom`) for multi-page/section navigation.

### 1.2. Backend
- **Language/Framework:** Python with FastAPI (Reverted to Python for stronger Computer Vision library support for facial detection).
- **API Type:** RESTful APIs.
    - Existing: `POST /analyze_face_emotion`
    - New Task Endpoints:
        - `POST /tasks` (Create a new task)
        - `GET /tasks` (List all tasks - for potential admin/debug)
        - `GET /tasks/suggestion?emotion={emotion}` (Get a task suggestion for a given emotion)
        - `DELETE /tasks/{task_id}` (Delete a specific task)

### 1.3. Task Storage (MVP)
- **Method:** Local JSON file (`tasks.json`) in the backend directory.
- **Structure:** An array of task objects. Each object will contain:
    - `id`: String (e.g., UUID, or simple incrementing integer managed by the app)
    - `description`: String
    - `associated_emotions`: Array of strings (e.g., ["happy", "neutral"])
    - `created_at`: String (ISO 8601 timestamp)

### 1.4. Machine Learning & AI (MVP)
- **Emotion Detection - Facial:** Using a library like `deepface` or OpenCV with a pre-trained facial emotion recognition (FER) model. The frontend will capture an image/video frame and send it to the backend for analysis. Focus on basic emotion classification (e.g., happy, sad, neutral, angry, surprise).

### 1.5. Infrastructure & Deployment (Initial)
- **Containerization:** Docker (for local development consistency).
- **Deployment:** Focus on local development first. Simple cloud deployment (e.g., Heroku, Vercel for frontend, basic VPS for backend) can be considered post-MVP if needed.
- **CI/CD:** Not a priority for the initial simple MVP.

## 2. Technical Constraints & Considerations (MVP Focus)

- **Data Privacy & Security:** Basic secure practices for data handling. Full compliance measures (GDPR etc.) are for future scope beyond initial MVP, but good principles will be followed.
- **Real-time Processing:** Frontend will capture a frame from live camera. Backend processing of the single frame doesn't need to be strictly real-time, but responsive enough for a good user experience.
- **Scalability:** MVP will not be designed for high scalability; focus is on a working simple version.
- **Model Accuracy & Bias:** Use a standard pre-trained model. In-depth bias analysis is beyond MVP scope.
- **Integration:** No third-party integrations for MVP.
- **Cross-Platform Compatibility:** Web application should be responsive for modern desktop browsers.
- **Dark Mode UX:** UI will be dark mode by default.

## 3. Current Focus (Refactoring & Feature Expansion)

- **Code Refactoring:** Improve code readability and maintainability by organizing code into a better folder structure (both frontend and backend).
- **Frontend Enhancements:**
    - Implement a header and navigation structure.
    - Create distinct sections/pages using React Router:
        - Home: Information about the website, team, and roles.
        - Add Tasks: UI for creating new tasks.
        - Remove Tasks: UI for listing and deleting existing tasks.
        - Give Tasks (Emotion Analysis): The existing facial emotion detection and dynamic task suggestion feature.
    - Ensure the UI is responsive across different screen sizes.
- **Backend Enhancements:**
    - Implement `DELETE /tasks/{task_id}` endpoint.
    - Refactor backend code into a more organized structure if necessary (e.g., routers, services/models for tasks).
