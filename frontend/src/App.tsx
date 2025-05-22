import { Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AnalyzeEmotionPage from './pages/AnalyzeEmotionPage';
import AddTaskPage from './pages/AddTaskPage';
import RemoveTaskPage from './pages/RemoveTaskPage';

// --- Main App Layout & Routing ---
function App() {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="w-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-grow flex justify-center items-start">
        {/* The Outlet component is not needed here if App.tsx is just defining routes */}
        {/* Page components will handle their own centering or max-width if needed */}
        <div className="w-full p-4 md:p-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzeEmotionPage />} />
            <Route path="/add-task" element={<AddTaskPage />} />
            <Route path="/remove-tasks" element={<RemoveTaskPage />} />
            {/* TODO: Add a 404 Not Found route e.g. <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
      </main>
      <footer className="w-full bg-gray-800 text-center text-gray-500 text-sm py-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} Zidio AI Task Optimizer</p>
      </footer>
    </div>
  );
}

export default App;
