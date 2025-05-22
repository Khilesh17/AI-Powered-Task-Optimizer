import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="p-6 md:p-8 text-center animate-fadeIn">
            <h2 className="text-4xl font-bold text-sky-400 mb-6">
                Welcome to Zidio AI Task Optimizer!
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Discover a new way to align your tasks with your emotional state. Our application uses cutting-edge facial emotion analysis to understand how you're feeling and suggests tasks that best suit your current mood, aiming to enhance both your productivity and well-being.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-sky-500/30 transition-shadow duration-300">
                    <h3 className="text-2xl font-semibold text-sky-300 mb-3">How It Works</h3>
                    <p className="text-gray-400">
                        Simply start your camera, let the application analyze your facial expression, and receive a task suggestion tailored to your detected emotion. You can also add your own tasks and associate them with different moods!
                    </p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-sky-500/30 transition-shadow duration-300">
                    <h3 className="text-2xl font-semibold text-sky-300 mb-3">Our Mission</h3>
                    <p className="text-gray-400">
                        We aim to foster a more empathetic and productive environment by helping individuals understand and work in harmony with their emotions. Your well-being is our priority.
                    </p>
                </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
                <h3 className="text-2xl font-semibold text-sky-300 mb-4">Meet the Team (Placeholder)</h3>
                <p className="text-gray-400 mb-2">
                    Our dedicated team is passionate about leveraging AI for a better work-life experience.
                </p>
                <ul className="text-gray-400 list-disc list-inside">
                    <li>Khilesh Katre - Team Lead + Full Stack Developer</li>
                    <li>Tripti - Full Stack Developer</li>
                    <li>Shriyansh Shrivastava - Designer</li>
                    <li>Raj Aryan Purohit - Devops Engineer</li>
                    {/* Add more team members and roles as needed */}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
