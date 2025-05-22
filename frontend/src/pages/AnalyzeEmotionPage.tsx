import React, { useState, useRef, useEffect, useCallback } from 'react';

// Interfaces (can be moved to a shared types file later)
interface EmotionData {
    [key: string]: number;
}
interface EmotionAnalysisResponse {
    dominant_emotion: string;
    emotions: EmotionData;
}
interface Task {
    id: string;
    description: string;
    associated_emotions: string[];
    created_at: string;
}
interface TaskSuggestionResponse {
    suggested_task: Task | null;
    message: string;
}

const AnalyzeEmotionPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [emotionResponse, setEmotionResponse] = useState<EmotionAnalysisResponse | null>(null);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
    const [suggestedTask, setSuggestedTask] = useState<TaskSuggestionResponse | null>(null);

    const startCamera = useCallback(async () => {
        setAnalysisError(null); setCameraError(null); setEmotionResponse(null); setSuggestedTask(null); setIsVideoReady(false);
        if (stream) { stream.getTracks().forEach(track => track.stop()); setStream(null); }
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
            setStream(newStream);
        } catch (err) { console.error("Error accessing camera:", err); setCameraError("Could not access camera. Please ensure permissions are granted."); setStream(null); }
    }, [stream]);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(err => console.error("Video play error:", err));
        } else if (videoRef.current && !stream) { videoRef.current.srcObject = null; }
        return () => { if (stream) stream.getTracks().forEach(track => track.stop()); };
    }, [stream]);

    const stopCamera = () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
        setStream(null); setIsVideoReady(false); setEmotionResponse(null); setSuggestedTask(null); setCameraError(null);
    };

    const fetchTaskSuggestion = async (emotion: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/tasks/suggestion?emotion=${emotion.toLowerCase()}`);
            if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Failed to fetch task suggestion.');
            setSuggestedTask(await response.json());
        } catch (err) {
            console.error("Failed to fetch task suggestion:", err);
            setSuggestedTask({ suggested_task: null, message: "Could not fetch task suggestion." });
        }
    };

    const captureFrameAndAnalyze = async () => {
        if (!videoRef.current || !canvasRef.current || !stream || !isVideoReady) { setAnalysisError("Camera not ready, stream not available, or video metadata not loaded."); return; }
        setIsLoadingAnalysis(true); setAnalysisError(null); setEmotionResponse(null); setSuggestedTask(null);
        const video = videoRef.current; const canvas = canvasRef.current;
        canvas.width = video.videoWidth; canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (!context) { setAnalysisError("Could not get canvas context."); setIsLoadingAnalysis(false); return; }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
            if (!blob) { setAnalysisError("Frame capture failed."); setIsLoadingAnalysis(false); return; }
            const formData = new FormData(); formData.append('image_file', blob, 'frame.png');
            try {
                const response = await fetch('http://localhost:8000/api/v1/analyze_face_emotion', { method: 'POST', body: formData });
                if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Analysis error.');
                const data: EmotionAnalysisResponse = await response.json();
                setEmotionResponse(data);
                if (data.dominant_emotion) {
                    await fetchTaskSuggestion(data.dominant_emotion);
                }
            } catch (err) { setAnalysisError(err instanceof Error ? err.message : 'An unexpected error occurred during analysis.'); }
            finally { setIsLoadingAnalysis(false); }
        }, 'image/png');
    };

    return (
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-2xl flex flex-col items-center animate-fadeIn">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-sky-400">Zidio Facial Emotion Analyzer</h1>
            <div className="w-full mb-4 p-4 border border-gray-700 rounded-md bg-gray-850 text-center">
                {!stream ? (
                    <button onClick={startCamera} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition">Start Camera</button>
                ) : (<p className="text-green-400">Camera is ON</p>)}
                {cameraError && <p className="text-red-400 mt-2 text-center">{cameraError}</p>}
            </div>
            {stream && (
                <div className="w-full space-y-4">
                    <div className="relative w-full aspect-video bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" onLoadedMetadata={(e) => { if (e.currentTarget.videoWidth > 0) setIsVideoReady(true); }} />
                        {!isVideoReady && <p className="absolute text-yellow-400">Waiting for video...</p>}
                        <canvas ref={canvasRef} className="hidden"></canvas>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <button onClick={captureFrameAndAnalyze} className="flex-1 bg-sky-600 hover:bg-sky-700 font-semibold py-3 px-4 rounded-md disabled:opacity-50" disabled={isLoadingAnalysis || !isVideoReady}>{isLoadingAnalysis ? 'Analyzing...' : 'Analyze Emotion'}</button>
                        <button onClick={stopCamera} className="flex-1 bg-red-600 hover:bg-red-700 font-semibold py-3 px-4 rounded-md">Stop Camera</button>
                    </div>
                </div>
            )}
            {analysisError && <div className="w-full mt-4 p-3 bg-red-700 bg-opacity-50 text-red-300 border border-red-500 rounded-md"><p><strong className="font-semibold">Analysis Error:</strong> {analysisError}</p></div>}
            {emotionResponse && (
                <div className="w-full mt-6 p-4 bg-gray-700 rounded-md space-y-3">
                    <h2 className="text-xl font-semibold text-sky-300">Analysis Result:</h2>
                    <p><strong className="font-medium text-gray-300">Dominant Emotion:</strong> <span className="font-bold text-xl text-yellow-400">{emotionResponse.dominant_emotion}</span></p>
                    {suggestedTask && suggestedTask.suggested_task && (<p className="text-lg text-teal-300">Suggested Task: <span className="font-semibold">{suggestedTask.suggested_task.description}</span></p>)}
                    {suggestedTask && !suggestedTask.suggested_task && (<p className="text-lg text-orange-400">{suggestedTask.message}</p>)}
                    <details className="text-sm text-gray-400 cursor-pointer"><summary className="font-medium">Detailed Scores</summary><ul className="list-disc list-inside pl-4 mt-1">{Object.entries(emotionResponse.emotions).map(([emotion, score]) => (<li key={emotion}>{emotion}: {score.toFixed(2)}%</li>))}</ul></details>
                </div>
            )}
        </div>
    );
};

export default AnalyzeEmotionPage;
