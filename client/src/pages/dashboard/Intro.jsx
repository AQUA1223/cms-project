import React from "react";


export default function Intro() {
    return (
        <div className="p-16 min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 rounded-lg shadow-lg">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-6 font-mono">Online Notes Management</h1>
            <p className="text-blue-800 mb-8 text-xl font-sans">
                Effortlessly manage your notes from anywhere, anytime. Our platform is designed to keep your ideas organized and accessible online.
            </p>
            <ul className="list-disc pl-8 text-blue-900 space-y-4 text-lg font-serif">
                <li>Securely create, edit, and delete notes in the cloud</li>
                <li>Access your notes across all your devices</li>
                <li>Organize notes with tags and categories</li>
                <li>Collaborate and share notes with your team</li>
                <li>Search and filter notes instantly</li>
            </ul>
        </div>
    )
}