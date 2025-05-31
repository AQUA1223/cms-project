import { useState, useEffect } from 'react';
import storageService from '../../service/storageService';
import userService from '../../service/userService';

export default function TodoList() {
  const [arr, setArr] = useState([]);
  const [input, setInput] = useState("");
  const [showNotepad, setShowNotepad] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");

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
    const newArr = [...arr, input];
    setArr(newArr);
    setInput('');
    setShowNotepad(false);
    if (userId) {
      storageService.saveNotes(userId, newArr);
    }
  }

  function handleEdit(idx) {
    setEditIdx(idx);
    setEditValue(arr[idx]);
  }

  function handleEditSave(event) {
    event.preventDefault();
    if (editValue.trim() !== "") {
      const newArr = [...arr];
      newArr[editIdx] = editValue;
      setArr(newArr);
      setEditIdx(null);
      setEditValue("");
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
    const userId = userService.getCurrentUser();
    if (userId) {
      storageService.saveNotes(userId, newArr);
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-50 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Plus Icon and Notes List */}
      <div className="flex flex-col items-center w-full">
        {!showNotepad && !editIdx && (
          <button
            onClick={() => setShowNotepad(true)}
            className="flex flex-col items-center justify-center bg-white rounded-full shadow-2xl border-4 border-blue-300 p-12 hover:scale-105 transition mb-10"
            style={{ minWidth: 220 }}
          >
            <svg className="w-20 h-20 text-blue-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" fill="#e0f2fe" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M24 14v20M14 24h20" stroke="currentColor" strokeWidth="4" />
            </svg>
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
                <li key={index} className="flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow p-5 border-l-4 border-blue-400 group transition">
                  <span className="text-blue-900 font-semibold break-words">{value}</span>
                  <div className="space-x-2 opacity-0 group-hover:opacity-100 transition">
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
            <div className="flex items-center justify-between bg-blue-50 rounded-xl px-6 py-4 shadow-inner border-t-2 border-blue-200 mt-6">
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
      </div>

      {/* Notepad Modal */}
      {showNotepad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-blue-300 p-10 w-full max-w-2xl">
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
              <form onSubmit={handleAdd} className="flex mb-10 space-x-4 z-10 relative">
                <input
                  placeholder="Type your note here..."
                  type="text"
                  required
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner"
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
      {editIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-blue-300 p-10 w-full max-w-2xl">
            <button
              onClick={() => { setEditIdx(null); setEditValue(""); }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 transition"
              aria-label="Close"
            >
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="max-w-lg mx-auto mt-4">
              <h2 className="text-4xl font-black mb-8 text-center text-blue-700 tracking-widest drop-shadow">Edit Note</h2>
              <form onSubmit={handleEditSave} className="flex mb-10 space-x-4 z-10 relative">
                <input
                  placeholder="Edit your note..."
                  type="text"
                  required
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 font-medium shadow-inner"
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
