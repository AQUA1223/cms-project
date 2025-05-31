import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import storageService from '../../service/storageService';
import userService from '../../service/userService';

export default function TodoList() {
  const [arr, setArr] = useState([]);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [showNotepad, setShowNotepad] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = userService.getCurrentUser();
    if (userId) {
      const notes = storageService.getNotes(userId);
      setArr(notes);
    }
  }, []);

  function handleAdd(event) {
    event.preventDefault();
    const userId = userService.getCurrentUser();
    const noteObj = { title, subject, note: input };
    const newArr = [...arr, noteObj];
    setArr(newArr);
    setInput('');
    setTitle('');
    setSubject('');
    setShowNotepad(false);
    if (userId) {
      storageService.addNote(userId, noteObj); // Save the note object
      navigate('/dashboard/savednotes'); // Navigate to savednotes page after saving
    }
  }

  function handleEdit(idx) {
    setEditIdx(idx);
    setEditValue(arr[idx]);
    setShowEditModal(true);
  }

  function handleEditSave(event) {
    event.preventDefault();
    if (editValue && editValue.title && editValue.subject && editValue.note) {
      const newArr = [...arr];
      newArr[editIdx] = editValue;
      setArr(newArr);
      setEditIdx(null);
      setEditValue("");
      setShowEditModal(false);
      const userId = userService.getCurrentUser();
      if (userId) {
        storageService.saveNotes(userId, newArr);
      }
    }
  }

  function handleDelete(del_idx) {
    const newArr = arr.filter((value, index) => index !== del_idx);
    setArr(newArr);
    if (editIdx === del_idx) {
      setEditIdx(null);
      setEditValue("");
    }
    // Do NOT update storageService here, so saved notes remain untouched
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 relative overflow-hidden fixed inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 80% 20%, #a7f3d0 0%, transparent 60%), " +
          "radial-gradient(circle at 20% 80%, #fbcfe8 0%, transparent 60%), " +
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover, cover, cover",
        backgroundPosition: "center, center, center",
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        zIndex: 0
      }}
    >
      {/* Decorative floating shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl animate-pulse z-0" style={{ filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-pink-200 rounded-full opacity-20 blur-2xl animate-pulse z-0" style={{ filter: 'blur(60px)' }} />
      {/* Plus Icon and Notes List */}
      <div className="flex flex-col items-center w-full z-10">
        {/* Total Notes Above Plus Icon */}
        {!showNotepad && !editIdx && (
          <div className="w-full max-w-2xl mb-8">
            <div className="flex items-center justify-between bg-blue-50 rounded-xl px-6 py-4 shadow-inner border-t-2 border-blue-200 mb-8">
              <div className="flex items-center space-x-3">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                </svg>
                <span className="text-blue-700 font-bold text-lg">Total Notes:</span>
              </div>
              <span className="text-blue-900 font-extrabold text-2xl">{arr.length}</span>
            </div>
          </div>
        )}
        {/* Plus Icon */}
        {!showNotepad && !editIdx && (
          <button
            onClick={() => setShowNotepad(true)}
            className="flex flex-col items-center justify-center bg-white rounded-full shadow-2xl border-4 border-blue-300 p-12 hover:scale-105 transition mb-10 drop-shadow-xl hover:shadow-blue-200/80 group"
            style={{ minWidth: 220 }}
          >
            {/* Professional Plus Icon */}
            <span className="relative flex items-center justify-center w-20 h-20 mb-4">
              <span className="absolute w-full h-full rounded-full bg-gradient-to-tr from-blue-400 via-blue-200 to-blue-100 shadow-lg group-hover:from-blue-500 group-hover:to-blue-200 transition" />
              <svg className="relative z-10 w-12 h-12 text-blue-700 group-hover:text-blue-900 transition" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" fill="#e0f2fe" />
                <rect x="21" y="13" width="6" height="22" rx="3" fill="#3b82f6" />
                <rect x="13" y="21" width="22" height="6" rx="3" fill="#3b82f6" />
                <rect x="21" y="13" width="6" height="22" rx="3" fill="#2563eb" opacity="0.2" />
                <rect x="13" y="21" width="22" height="6" rx="3" fill="#2563eb" opacity="0.2" />
              </svg>
              <span className="absolute w-24 h-24 rounded-full bg-blue-200 opacity-20 blur-2xl z-0" />
            </span>
            <span className="text-2xl font-bold text-blue-700">New Notes</span>
          </button>
        )}
        {/* Notes List Below Plus Icon */}
        {!showNotepad && !editIdx && (
          <div className="w-full max-w-2xl mb-8">
            <ul className="space-y-4">
              {arr.length === 0 && (
                <li className="text-center text-blue-400 italic">No notes yet. Start adding!</li>
              )}
              {arr.map((value, index) => (
                <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-lg p-5 border-l-4 border-blue-400 group transition hover:scale-[1.02] hover:shadow-blue-200/80 relative overflow-hidden">
                  {/* Decorative accent */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-200 rounded-full opacity-20 blur-2xl z-0" />
                  <div className="flex-1 z-10">
                    <div className="text-blue-700 font-bold text-lg break-words break-all whitespace-pre-line">{value.title}</div>
                    <div className="text-blue-500 font-medium text-md mb-1 break-words break-all whitespace-pre-line">{value.subject}</div>
                    <div className="text-blue-900 font-semibold break-words break-all whitespace-pre-line max-w-full" style={{wordBreak: 'break-word', overflowWrap: 'break-word'}}>{value.note}</div>
                  </div>
                  <div className="space-x-2 opacity-0 group-hover:opacity-100 transition flex mt-2 sm:mt-0 z-10">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-2 rounded-full hover:bg-blue-300/40 transition"
                      aria-label="Edit"
                      title="Edit"
                    >
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3.414a2 2 0 01.586-1.414z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
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
          </div>
        )}
      </div>
      {/* Notepad Modal */}
      {showNotepad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-blue-300 p-10 w-full max-w-2xl animate-fade-in">
            <button
              onClick={() => setShowNotepad(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 transition"
              aria-label="Close"
            >
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Notepad Module */}
            <div className="max-w-lg mx-auto mt-4">
              <h2 className="text-4xl font-black mb-8 text-center text-blue-700 tracking-widest drop-shadow">My Notes</h2>
              <form onSubmit={handleAdd} className="flex flex-col mb-10 space-y-4 z-10 relative">
                <input
                  placeholder="Title"
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner placeholder-blue-400"
                />
                <input
                  placeholder="Subject"
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner placeholder-blue-400"
                />
                <textarea
                  placeholder="Type your note here..."
                  required
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="flex-1 px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner min-h-[100px] placeholder-blue-400"
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
      {/* Edit Note Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-blue-300 p-10 w-full max-w-2xl animate-fade-in">
            <button
              onClick={() => { setShowEditModal(false); setEditIdx(null); setEditValue(""); }}
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
                <label htmlFor="edit-title" className="text-blue-700 font-semibold mb-1">Title</label>
                <input
                  id="edit-title"
                  placeholder={editValue.title || "Title"}
                  type="text"
                  required
                  value={editValue.title || ""}
                  onChange={e => setEditValue({ ...editValue, title: e.target.value })}
                  className="px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner placeholder-blue-400"
                />
                <label htmlFor="edit-subject" className="text-blue-700 font-semibold mb-1">Subject</label>
                <input
                  id="edit-subject"
                  placeholder={editValue.subject || "Subject"}
                  type="text"
                  required
                  value={editValue.subject || ""}
                  onChange={e => setEditValue({ ...editValue, subject: e.target.value })}
                  className="px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner placeholder-blue-400"
                />
                <label htmlFor="edit-note" className="text-blue-700 font-semibold mb-1">Note</label>
                <textarea
                  id="edit-note"
                  placeholder={editValue.note || "Type your note here..."}
                  required
                  value={editValue.note || ""}
                  onChange={e => setEditValue({ ...editValue, note: e.target.value })}
                  className="flex-1 px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner min-h-[100px] placeholder-blue-400"
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
  );
}
