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
                <h1 style={headingStyle}>About Keep Notes</h1>
                <p style={paragraphStyle}>
                    <strong>Keep Notes</strong> is a modern, efficient online notes app to help you organize your thoughts, ideas, and tasks. Whether you need quick reminders or detailed notes, Keep Notes offers a clean, intuitive interface for all your note-taking needs.
                </p>
                <h2 style={subHeadingStyle}>Our Team</h2>
                <div style={teamMemberContainer}>
                    {teamMembers.map((name, idx) => (
                        <span
                            key={name}
                            style={teamMemberStyle(idx === current)}
                        >
                            {name}
                        </span>
                    ))}
                </div>
                <p style={paragraphStyle}>
                    This project was built with passion and dedication by our team. We hope Keep Notes helps you stay organized and productive!
                </p>
            </div>
        </>
    );
};

export default About;