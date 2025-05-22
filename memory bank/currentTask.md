# Current Task: Implement Multi-Modal Emotion Analysis (Face, Voice, Text) & Debug Audio

 **Date:** 2025-05-25

 **Objective:** To enhance the 10-second continuous analysis feature by incorporating voice and optional text analysis alongside facial emotion detection, and to debug the "Could not start audio recording" error. The system will then present individual results from each modality and determine an overall emotion for task suggestions. Single-frame analysis will remain facial-only.

 **Previous Task Summary (Multi-Modal Placeholders & UI Setup):** 
*   Implemented UI for dual analysis modes (single-frame face, 10s multi-modal).
*   Backend placeholder services and endpoints created for voice and text emotion analysis.
*   Frontend logic implemented for capturing video frames, attempting audio recording (currently bugged), providing text input, and making API calls.
*   UI updated to display results from face, voice (planned), and text (planned).
* **Immediate Issue:** "Could not start audio recording" error in `AnalyzeEmotionPage.tsx`.

## Task Breakdown & Checklist:

*   [ ] **Phase 0: Debug Audio Recording (`AnalyzeEmotionPage.tsx`)** 
    -   [ ] **Add Detailed Logging & Checks:**
        -   [ ] Log `stream.getAudioTracks()` in `startAudioRecording` to verify audio track presence and state.
        -   [ ] Implement `MediaRecorder.isTypeSupported()` check for preferred `mimeType`s and select a supported one.
        -   [ ] Wrap `new MediaRecorder(...)` instantiation in a `try...catch` block.
        -   [ ] Add an `onerror` event handler to the `MediaRecorder` instance to log specific recording errors.
    -   [ ] **Implement Fix:** Based on logs and checks, apply necessary changes to resolve the "Could not start audio recording" error.
    -   [ ] **Verify Fix:** Test audio recording functionality thoroughly, checking console logs for detailed information.

*   [x] **Phase 1: Backend - Voice Emotion Analysis (Placeholder Service)** (Completed 2025-05-23)
    -   [x] **Research & Setup:** Placeholder service created.
    -   [x] **Create New Service (`backend/app/services/voice_emotion_service.py`):** Implemented with placeholder logic.
    -   [x] **Create New Endpoint (`backend/app/api/voice_emotion_router.py`):** Defined `POST /api/v1/analyze_voice_emotion`.
    -   [x] **Update `backend/app/main.py`:** Added `voice_emotion_router`.

*   [x] **Phase 2: Backend - Text Emotion Analysis (Placeholder Service)** (Completed 2025-05-23)
    -   [x] **Research & Setup:** Placeholder service created.
    -   [x] **Create New Service (`backend/app/services/text_emotion_service.py`):** Implemented with placeholder logic.
    -   [x] **Create New Endpoint (`backend/app/api/text_emotion_router.py`):** Defined `POST /api/v1/analyze_text_emotion`.
    -   [x] **Update `backend/app/main.py`:** Added `text_emotion_router`.

*   [ ] **Phase 3: Backend - Model Integration (Post-Placeholder)** 
    -   [ ] **Sub-Phase 3.1: Voice Emotion Recognition (SER) Model** 
        *   [ ] Research and select a suitable Python library/pre-trained model for SER (e.g., Hugging Face `transformers`, `librosa`, `torch`/`tensorflow`).
        *   [ ] Install necessary dependencies.
        *   [ ] Implement SER model loading and prediction logic in `voice_emotion_service.py`, replacing placeholder.
        *   [ ] Unit test the voice analysis service and endpoint with the actual model.
    -   [ ] **Sub-Phase 3.2: Text Emotion Analysis Model** 
        *   [ ] Research and select a Python library/model for text-based emotion/sentiment analysis.
        *   [ ] Install necessary dependencies.
        *   [ ] Implement text analysis model loading and prediction logic in `text_emotion_service.py`, replacing placeholder.
        *   [ ] Unit test the text analysis service and endpoint with the actual model.

*   [ ] **Phase 4: Frontend - Multi-Modal Data Capture & UI (`AnalyzeEmotionPage.tsx`)** (Partially Completed, Bug Present)
    -   [x] **Audio Recording:** Implemented audio capture using `MediaRecorder` (NEEDS DEBUGGING - see Phase 0).
    -   [x] **Text Input:** Added `<textarea>` for optional user input.
    -   [x] **State Management:** Added state for voice/text results and loading states.
    -   [x] **Modify `startAnalysisPeriod` / `processCollectedEmotions` flow:** Updated to include calls to voice/text analysis endpoints.
    -   [x] **Display Multi-Modal Results:** JSX updated to display separate results for face, voice, and text.

*   [ ] **Phase 5: Frontend - Result Integration & Task Suggestion (`AnalyzeEmotionPage.tsx`)** 
    -   [ ] **Integration Strategy:** 
        *   Display the dominant emotion from each modality separately.
        *   Determine an "overall" dominant emotion. Initial plan:
            1.  Prioritize strong, non-neutral emotions: Text > Voice > Aggregated Facial.
            2.  If all are neutral or unclear, default to a general positive or neutral state for suggestions.
            (This needs refinement; start by using aggregated facial emotion for task suggestion if other modalities are not yet fully reliable, and display others for context).

    -   [ ] **Update `fetchTaskSuggestionsList`:** Ensure it's called with the chosen "overall" dominant emotion.
    -   [ ] **UI Refinement for Overall Emotion:** Clearly present the individual modality results and the final overall emotion used for task suggestions.

*   [ ] **Phase 6: Frontend - Refinements (`AnalyzeEmotionPage.tsx`)** 
    -   [ ] **Refine Multi-Modal Flow:** Ensure smooth orchestration of facial, voice, and text data capture and API calls.
    -   [ ] **UI Refinement (General):** Ensure clear presentation of loading states, errors from any modality, and overall user experience.

*   [ ] **Phase 7: Testing & Refinement (Comprehensive)** 
    -   [ ] Test single-frame facial analysis (should remain unchanged).
    -   [ ] Test 10-second multi-modal analysis flow:
        *   Facial, voice (post-fix), and text data capture.
        *   Backend processing for each modality (once real models are integrated).
        *   Display of individual and integrated results.
        *   Task suggestions based on the determined overall emotion.
    -   [ ] Test edge cases (e.g., no speech, no text input, errors from one modality, permission denials for mic/camera).
    -   [ ] Check UI responsiveness and clarity across different states.

## Implementation Notes:

* **Priority 1:** Debug audio recording (Phase 0).
*   Then proceed with backend model integration (Phase 3).
*   Followed by frontend integration and refinements (Phase 5, Phase 6).
*   The "result integration strategy" (Phase 5) is complex; for the first pass after bug fixing, displaying individual results and using the aggregated facial emotion for task suggestions is acceptable if voice/text models are not yet robust. A more sophisticated fusion can be a future enhancement.

## Acceptance Criteria:

*   User can initiate a 10-second multi-modal analysis without audio recording errors.
*   During this period, facial frames are analyzed, audio is recorded successfully, and optional text can be input.
*   Backend (with integrated models) provides separate analysis for voice and text.
*   Frontend displays results from facial, voice, and text analyses.
*   An overall emotion is determined and used for task suggestions.
*   Task suggestions are provided based on this overall emotion.
*   Single-frame facial analysis remains functional.
