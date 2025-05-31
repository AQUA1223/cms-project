const NOTES_KEY = 'user_notes';

const storageService = {
    saveNotes: (userId, notes) => {
        let allNotes = JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
        allNotes[userId] = notes;
        localStorage.setItem(NOTES_KEY, JSON.stringify(allNotes));
    },

    getNotes: (userId) => {
        const allNotes = JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
        return allNotes[userId] || [];
    },

    removeNotes: (userId) => {
        let allNotes = JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
        delete allNotes[userId];
        localStorage.setItem(NOTES_KEY, JSON.stringify(allNotes));
    },

    addNote: (userId, note) => {
        let allNotes = JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
        if (!allNotes[userId]) {
            allNotes[userId] = [];
        }
        allNotes[userId].push(note);
        localStorage.setItem(NOTES_KEY, JSON.stringify(allNotes));
    },

    updateNote: (userId, idx, updatedNote) => {
        let allNotes = JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
        if (allNotes[userId] && allNotes[userId][idx]) {
            allNotes[userId][idx] = updatedNote;
            localStorage.setItem(NOTES_KEY, JSON.stringify(allNotes));
        }
    },

    deleteNote: (userId, idx) => {
        let allNotes = JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
        if (allNotes[userId]) {
            allNotes[userId].splice(idx, 1);
            localStorage.setItem(NOTES_KEY, JSON.stringify(allNotes));
        }
    }
};

export default storageService;