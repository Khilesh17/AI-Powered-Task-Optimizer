# Active Context: Zidio AI-Powered Task Optimizer

## Current Focus: Finalizing Simplified MVP Plan

**Date:** 2025-05-21

**Status:** Planning phase. Core Memory Bank files created. Technology stack and MVP scope have been simplified based on user feedback for an initial working version.

## Recent Decisions & Key Insights:

1.  **Project Name:** Zidio AI-Powered Task Optimizer.
2.  **Core Goal (MVP):** Create a simple application to analyze employee mood from facial expressions (captured via camera) and suggest basic tasks. UI must be dark mode.
3.  **Simplified Technology Stack (Finalized for MVP):
    *   **Frontend:** React with Vite, Tailwind CSS (optionally DaisyUI or other React component libraries).
    *   **Backend:** Python with FastAPI (Reverted for better Computer Vision support).
    *   **Task Storage:** Local JSON file (`tasks.json`) instead of a database for MVP simplicity.
    *   **ML:** Pre-trained facial emotion recognition model (e.g., using `deepface` or OpenCV with a FER model).
4.  **Simplified MVP Scope (Finalized - Now includes Task Management):
    *   Core Feature 1: Facial emotion detection from camera image/frame.
    *   Core Feature 2: User ability to define new tasks and associate them with emotions.
    *   Core Feature 3: Dynamic task suggestion based on detected facial emotion and user-defined tasks.
    *   Core Feature 4: Simple mood logging (based on detected facial emotion - placeholder for now).
    *   Minimalist dark mode UI (SPA-like).
    *   Out of Scope for MVP: Advanced analytics, HR/Manager views, complex alerts, user accounts (initially).
5.  **Architectural Approach:** Modular Monolith (as per `systemPatterns.md`), with new Task Management capabilities.

## Next Steps:

1.  Update `currentTask.md` to detail implementation of task management and dynamic suggestions.
2.  Update `progress.md` with new feature milestones.
3.  Proceed with implementation in Act Mode.

## Resolved Questions:

-   Frontend preference: SvelteKit.
-   Backend preference: Python with FastAPI (reverted for CV).
-   Infrastructure/Constraints: Focus on local development first, simple cloud deployment later if needed. No complex constraints for MVP.
-   ML Model preference: Pre-trained facial emotion recognition model.
-   MVP Priorities: Confirmed focus on facial emotion detection, basic task suggestion, and mood logging.
-   Third-party integrations: None for MVP.