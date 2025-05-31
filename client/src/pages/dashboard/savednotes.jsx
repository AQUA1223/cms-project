import React, { useEffect, useState } from 'react';
import storageService from '../../service/storageService';
import userService from '../../service/userService';

export default function SavedNotes() {
  const [notes, setNotes] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editNote, setEditNote] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const userId = userService.getCurrentUser();
    if (userId) {
      const userNotes = storageService.getNotes(userId);
      setNotes(userNotes);
    }
  }, []);

  function handleEdit(idx) {
    setEditIdx(idx);
    setEditTitle(notes[idx].title || "");
    setEditSubject(notes[idx].subject || "");
    setEditNote(notes[idx].note || "");
    setShowEditModal(true);
  }

  function handleEditSave(event) {
    event.preventDefault();
    if (editTitle.trim() !== "" && editSubject.trim() !== "" && editNote.trim() !== "") {
      const userId = userService.getCurrentUser();
      const newNotes = [...notes];
      newNotes[editIdx] = { title: editTitle, subject: editSubject, note: editNote };
      setNotes(newNotes);
      setEditIdx(null);
      setEditTitle("");
      setEditSubject("");
      setEditNote("");
      setShowEditModal(false);
      if (userId) {
        storageService.saveNotes(userId, newNotes);
      }
    }
  }

  function handleDelete(idx) {
    const userId = userService.getCurrentUser();
    const newNotes = notes.filter((_, i) => i !== idx);
    setNotes(newNotes);
    if (userId) {
      storageService.saveNotes(userId, newNotes);
    }
    if (editIdx === idx) {
      setEditIdx(null);
      setEditTitle("");
      setEditSubject("");
      setEditNote("");
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10">
      <div className="bg-white/80 rounded-3xl shadow-2xl p-10 w-full max-w-3xl flex flex-col items-center border-4 border-blue-200">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-8 tracking-widest drop-shadow-lg flex items-center gap-3">
          <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          </svg>
          Saved Notes
        </h2>
        {notes.length === 0 ? (
          <div className="text-blue-400 italic text-lg">No saved notes yet.</div>
        ) : (
          <ul className="w-full space-y-6">
            {notes.map((note, idx) => (
              <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-blue-100 to-pink-100 rounded-2xl shadow-lg p-6 border-l-8 border-blue-400 group transition hover:scale-[1.02] hover:shadow-2xl">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-400 shadow"></span>
                    <span className="text-blue-700 font-bold text-xl tracking-wide">{note.title}</span>
                  </div>
                  <div className="text-blue-500 font-medium text-md mb-2 italic">{note.subject}</div>
                  <div className="text-blue-900 font-semibold break-words text-lg bg-blue-50 rounded-xl p-4 shadow-inner border border-blue-200">
                    {note.note}
                  </div>
                </div>
                <div className="space-x-2 opacity-0 group-hover:opacity-100 transition flex mt-4 sm:mt-0">
                  <button
                    onClick={() => handleEdit(idx)}
                    className="p-2 rounded-full hover:bg-blue-300/40 transition"
                    aria-label="Edit"
                    title="Edit"
                  >
                    <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3.414a2 2 0 01.586-1.414z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="p-2 rounded-full hover:bg-red-200/60 transition"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-blue-300 p-10 w-full max-w-2xl">
              <button
                onClick={() => { setShowEditModal(false); setEditIdx(null); setEditTitle(""); setEditSubject(""); setEditNote(""); }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 transition"
                aria-label="Close"
              >
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="max-w-lg mx-auto mt-4">
                <h2 className="text-4xl font-black mb-8 text-center text-blue-700 tracking-widest drop-shadow">Edit Note</h2>
                <form onSubmit={handleEditSave} className="flex flex-col mb-10 space-y-4 z-10 relative">
                  <input
                    placeholder="Title"
                    type="text"
                    required
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner"
                  />
                  <input
                    placeholder="Subject"
                    type="text"
                    required
                    value={editSubject}
                    onChange={e => setEditSubject(e.target.value)}
                    className="px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner"
                  />
                  <textarea
                    placeholder="Note"
                    required
                    value={editNote}
                    onChange={e => setEditNote(e.target.value)}
                    className="flex-1 px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner min-h-[100px]"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-7 py-4 rounded-xl hover:scale-105 transition font-bold shadow-lg"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
