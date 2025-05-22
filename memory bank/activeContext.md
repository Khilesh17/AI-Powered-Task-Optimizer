# Active Context: TaskNova

## Current Focus: Multi-Modal Emotion Analysis (Face, Voice, Text)

**Date:** 2025-05-23

**Status:** Planning implementation of multi-modal emotion analysis (face, voice, text) for the 10-second period. Single-frame analysis will remain facial-only.

## Recent Decisions & Key Insights:

1.  **Project Name:** TaskNova.
2.  **Core Goal (Current Phase):** For 10-second analysis, capture facial frames, audio, and optional text. Analyze each modality on the backend. Integrate/display results. Single-frame analysis remains visual only. Task suggestions to show all relevant tasks.
3.  **Technology Stack (Confirmed & Expanding for Multi-modal):
    *   **Frontend:** React with Vite, Tailwind CSS, React Router, `MediaRecorder` API for audio.
    *   **Backend:** Python with FastAPI.
    *   **Task Storage:** Local JSON file (`tasks.json`).
    *   **ML:** 
        *   Facial: `deepface` (existing).
        *   Voice: Python SER library (e.g., from Hugging Face Transformers, `librosa`).
        *   Text: Python NLP library for emotion/sentiment (e.g., NLTK, spaCy, Hugging Face Transformers).
4.  **Expanded Scope (Current Phase):
    *   **Multi-Modal Data Capture (Frontend):** During 10s analysis, capture video frames, record audio, allow optional text input.
    *   **New Backend Endpoints:** Create `/api/v1/analyze_voice_emotion` and `/api/v1/analyze_text_emotion`.
    *   **Backend Analysis Logic:** Implement voice and text emotion analysis services.
    *   **Result Integration/Display (Frontend):** Display separate results from face, voice, text, and then determine an overall emotion for task suggestions.
    *   **Display All Suggested Tasks:** (Completed) Backend returns all matching tasks, frontend displays them.
    *   **Dual Analysis Modes UI:** (Completed) UI for single-frame (face) and 10s (multi-modal) analysis.
    *   **Button Replacement:** (Completed) Standard buttons replaced with `<Button />`.
    *   **Common UI Components:** (Completed) `Button.tsx`, `ConfirmationModal.tsx`.
5.  **Architectural Approach:** Modular Monolith. Emotion Analysis Engine now explicitly includes facial, voice, and text processing capabilities.

## Next Steps:

1.  Update `currentTask.md` to detail implementation of multi-modal (face, voice, text) analysis for the 10-second period.
2.  Update `progress.md` with these new multi-modal feature milestones.
3.  Proceed with implementation in Act Mode, starting with backend voice analysis.

## Resolved Questions:

-   Frontend preference: SvelteKit.
-   Backend preference: Python with FastAPI (reverted for CV).
-   Infrastructure/Constraints: Focus on local development first, simple cloud deployment later if needed. No complex constraints for MVP.
-   ML Model preference: Pre-trained facial emotion recognition model.
-   MVP Priorities: Confirmed focus on facial emotion detection, basic task suggestion, and mood logging.
-   Third-party integrations: None for MVP.