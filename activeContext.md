# Active Context: TaskNova

## Current Focus: Code Refactoring & Frontend Feature Expansion

**Date:** 2025-05-22

**Status:** Post-MVP implementation. User requested code refactoring for better structure and significant frontend enhancements including navigation and new sections. Project name changed to TaskNova.

## Recent Decisions & Key Insights:

1.  **Project Name:** TaskNova.
2.  **Core Goal (Current Phase):** Refactor existing code for better readability and folder structure. Enhance frontend with a header, navigation (Home, Add Tasks, Remove Tasks, Give Tasks), and make it responsive. Implement backend logic for removing tasks.
3.  **Technology Stack (Confirmed):
    *   **Frontend:** React with Vite, Tailwind CSS, React Router.
    *   **Backend:** Python with FastAPI.
    *   **Task Storage:** Local JSON file (`tasks.json`).
    *   **ML:** Pre-trained facial emotion recognition model (`deepface`).
4.  **Expanded Scope (Current Phase):
    *   **Code Refactoring:** Organize frontend and backend code into logical folder structures (components, services, routes, etc.).
    *   **Frontend Navigation:** Implement a header and routing for Home, Add Tasks, Remove Tasks, and Give Tasks (Emotion Analysis) sections.
    *   **Home Section:** Static content about the website and team.
    *   **Remove Tasks Section:** UI to list and delete tasks (calling a new backend endpoint).
    *   **Responsiveness:** Ensure the frontend layout adapts to different screen sizes.
    *   **Backend Task Deletion:** Implement `DELETE /tasks/{task_id}` endpoint.
5.  **Architectural Approach:** Modular Monolith (as per `systemPatterns.md`), with new Task Management capabilities.

## Next Steps:

1.  Update `currentTask.md` to detail the refactoring and new frontend/backend feature implementation.
2.  Update `progress.md` with these new refactoring and feature milestones.
3.  Proceed with implementation in Act Mode, starting with folder structure and backend refactoring/enhancements.

## Resolved Questions:

-   Frontend preference: SvelteKit.
-   Backend preference: Python with FastAPI (reverted for CV).
-   Infrastructure/Constraints: Focus on local development first, simple cloud deployment later if needed. No complex constraints for MVP.
-   ML Model preference: Pre-trained facial emotion recognition model.
-   MVP Priorities: Confirmed focus on facial emotion detection, basic task suggestion, and mood logging.
-   Third-party integrations: None for MVP.