import React from "react";

export default function Intro() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated GIF background */}
            <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2b2J6d3F2b2J6d3F2b2J6d3F2b2J6d3F2b2J6d3F2b2J6/g7sQv1Q9y5Q2A/giphy.gif"
                alt="Animated background"
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
                style={{ zIndex: 0 }}
            />
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 to-blue-300/80 z-10" />
            {/* Main content */}
            <div className="relative z-20 p-12 md:p-20 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md max-w-3xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 font-mono drop-shadow-lg animate-fade-in">
                    Online Notes Management
                </h1>
                <p className="text-blue-800 mb-8 text-xl md:text-2xl font-sans animate-fade-in delay-100">
                    Effortlessly manage your notes from anywhere, anytime. Our platform is designed to keep your ideas organized and accessible online.
                </p>
                <ul className="list-disc pl-8 text-blue-900 space-y-4 text-lg md:text-xl font-serif text-left mx-auto max-w-xl animate-fade-in delay-200">
                    <li>📝 Securely create, edit, and delete notes in the cloud</li>
                    <li>📱 Access your notes across all your devices</li>
                    <li>🏷️ Organize notes with tags and categories</li>
                    <li>🤝 Collaborate and share notes with your team</li>
                    <li>🔍 Search and filter notes instantly</li>
                </ul>
            </div>
            {/* Simple fade-in animation */}
            <style>{`
                .animate-fade-in {
                    opacity: 0;
                    animation: fadeIn 1s forwards;
                }
                .animate-fade-in.delay-100 { animation-delay: 0.2s; }
                .animate-fade-in.delay-200 { animation-delay: 0.4s; }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}