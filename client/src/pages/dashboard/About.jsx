import React from 'react';

const containerStyle = {
    maxWidth: 600,
    margin: '48px auto',
    padding: '40px 32px',
    background: 'white',
    borderRadius: 20,
    boxShadow: '0 8px 32px rgba(44,62,80,0.10)',
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    border: '1px solid #e5e7eb',
};

const headingStyle = {
    fontSize: 36,
    fontWeight: 800,
    color: '#1a202c',
    marginBottom: 20,
    letterSpacing: 1.2,
    textAlign: 'center',
};

const subHeadingStyle = {
    fontSize: 24,
    fontWeight: 700,
    color: '#2563eb',
    marginTop: 36,
    marginBottom: 14,
    letterSpacing: 0.5,
};

const paragraphStyle = {
    fontSize: 18,
    color: '#374151',
    lineHeight: 1.8,
    marginBottom: 22,
    textAlign: 'justify',
};

const listStyle = {
    paddingLeft: 28,
    fontSize: 17,
    color: '#334155',
    marginBottom: 22,
    listStyleType: 'disc',
};

const listItemStyle = {
    marginBottom: 6,
    fontWeight: 500,
};

const About = () => (
    <div style={containerStyle}>
        <h1 style={headingStyle}>About Keep Notes</h1>
        <p style={paragraphStyle}>
            <strong>Keep Notes</strong> is a modern, efficient online notes app to help you organize your thoughts, ideas, and tasks. Whether you need quick reminders or detailed notes, Keep Notes offers a clean, intuitive interface for all your note-taking needs.
        </p>
        <h2 style={subHeadingStyle}>Our Team</h2>
        <ul style={listStyle}>
            <li style={listItemStyle}>Deepak Raj M</li>
            <li style={listItemStyle}>Harish R</li>
            <li style={listItemStyle}>Naveen C</li>
        </ul>
        <p style={paragraphStyle}>
            This project was built with passion and dedication by our team. We hope Keep Notes helps you stay organized and productive!
        </p>
    </div>
);

export default About;