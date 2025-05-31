import React, { useState, useEffect } from 'react';

const containerStyle = {
    maxWidth: 600,
    margin: '48px auto',
    padding: '40px 32px',
    background: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    boxShadow: '0 8px 32px rgba(44,62,80,0.13)',
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    border: '1px solid #e5e7eb',
    position: 'relative',
    zIndex: 1,
};

const bgStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #a5b4fc 0%, #fbc2eb 100%)',
    zIndex: 0,
};

const headingStyle = {
    fontSize: 38,
    fontWeight: 900,
    color: '#1a202c',
    marginBottom: 24,
    letterSpacing: 1.2,
    textAlign: 'center',
    textShadow: '0 2px 8px #e0e7ff',
};

const subHeadingStyle = {
    fontSize: 26,
    fontWeight: 700,
    color: '#2563eb',
    marginTop: 36,
    marginBottom: 18,
    letterSpacing: 0.5,
    textAlign: 'center',
};

const paragraphStyle = {
    fontSize: 18,
    color: '#374151',
    lineHeight: 1.8,
    marginBottom: 22,
    textAlign: 'justify',
};

const teamMemberContainer = {
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 22,
    position: 'relative',
};

const teamMemberStyle = (show) => ({
    fontSize: 22,
    fontWeight: 700,
    color: '#0ea5e9',
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.6s, transform 0.6s',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
});

const backgroundImageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const About = () => {
    const teamMembers = ['Deepak Raj M', 'Harish R', 'Naveen C'];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % teamMembers.length);
        }, 1800);
        return () => clearInterval(timer);
    }, [teamMembers.length]);

    return (
        <>
            <div
                style={{
                    ...bgStyle,
                    background: `linear-gradient(135deg, #a5b4fc 0%, #fbc2eb 100%), url(${backgroundImageUrl}) center/cover no-repeat`,
                    backgroundBlendMode: 'overlay',
                }}
            />
            <div style={containerStyle}>
                <h1 style={{
                    ...headingStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                }}>
                    <svg style={{ width: 44, height: 44, color: '#6366f1', filter: 'drop-shadow(0 2px 8px #a5b4fc)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="2.5" fill="#e0e7ff" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" stroke="#6366f1" strokeWidth="2.5" />
                    </svg>
                    About Keep Notes
                </h1>
                <p style={{
                    ...paragraphStyle,
                    background: 'linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)',
                    borderRadius: 12,
                    padding: '18px 20px',
                    boxShadow: '0 2px 12px #fbc2eb33',
                    marginBottom: 32,
                }}>
                    <strong>Keep Notes</strong> is a modern, efficient online notes app to help you organize your thoughts, ideas, and tasks. Whether you need quick reminders or detailed notes, Keep Notes offers a clean, intuitive interface for all your note-taking needs.
                </p>
                <h2 style={{
                    ...subHeadingStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                }}>
                    <svg style={{ width: 28, height: 28, color: '#2563eb' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13a4 4 0 10-8 0 4 4 0 008 0z" />
                    </svg>
                    Our Team
                </h2>
                <div style={{
                    ...teamMemberContainer,
                    background: 'linear-gradient(90deg, #e0e7ff 0%, #fbc2eb 100%)',
                    borderRadius: 10,
                    boxShadow: '0 2px 8px #a5b4fc33',
                }}>
                    {teamMembers.map((name, idx) => (
                        <span
                            key={name}
                            style={teamMemberStyle(idx === current)}
                        >
                            <svg style={{ width: 22, height: 22, color: '#0ea5e9', marginRight: 8, verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="7" r="4" stroke="#0ea5e9" strokeWidth="2" fill="#bae6fd" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.607 6.879 1.804" stroke="#0ea5e9" strokeWidth="2" />
                            </svg>
                            {name}
                        </span>
                    ))}
                </div>
                <p style={{
                    ...paragraphStyle,
                    background: 'linear-gradient(90deg, #a6c1ee 0%, #fbc2eb 100%)',
                    borderRadius: 12,
                    padding: '16px 18px',
                    boxShadow: '0 2px 12px #a6c1ee33',
                    marginTop: 18,
                }}>
                    This project was built with passion and dedication by our team. We hope Keep Notes helps you stay organized and productive!
                </p>
                <div style={{
                    marginTop: 36,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <span style={{ color: '#6366f1', fontWeight: 700, fontSize: 18, letterSpacing: 0.5 }}>
                        <svg style={{ width: 20, height: 20, color: '#6366f1', marginRight: 6, verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" />
                        </svg>
                        Version 1.0.0 &nbsp;|&nbsp; Released May 2025
                    </span>
                    <span style={{ color: '#2563eb', fontWeight: 500, fontSize: 16 }}>
                        Made with <span style={{ color: '#f43f5e', fontWeight: 900, fontSize: 18 }}>♥</span> by the Keep Notes Team
                    </span>
                </div>
            </div>
        </>
    );
};

export default About;