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
    }
};

export default storageService;