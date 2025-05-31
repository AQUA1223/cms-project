import { useState } from 'react';

function Card({ index, value, handleEdit, handleDelete }) {
  return (
    <li className="flex items-center justify-between bg-white rounded shadow p-3 mb-2">
      <span className="text-gray-800">{value}</span>
      <div className="space-x-2">
        <button
          onClick={() => handleEdit(index)}
          className="p-2 rounded hover:bg-blue-100 transition"
          aria-label="Edit"
        >
          ✏️
        </button>
        <button
          onClick={() => handleDelete(index)}
          className="p-2 rounded hover:bg-red-100 transition"
          aria-label="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default function TodoList() {
  const [arr, setArr] = useState([]);
  const [input, setInput] = useState("");

  function handleAdd(event) {
    event.preventDefault();
    setArr([...arr, input]);
    setInput('');
  }

  function handleEdit(edit_idx) {
    const newValue = prompt("Enter new value");
    if (newValue !== null && newValue.trim() !== "") {
      arr[edit_idx] = newValue;
      setArr([...arr]);
    }
  }
  function handleDelete(del_idx) {
    const newArr = arr.filter((value, index) => index !== del_idx);
    setArr(newArr);
  }
  return (
    <div className="max-w-lg mx-auto mt-14 bg-white/90 rounded-3xl shadow-2xl border-4 border-blue-300 p-10 relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full opacity-30 z-0"></div>
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
      <div className="max-h-72 overflow-y-auto pr-2 mb-8">
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
      </div>
      <div className="flex items-center justify-between bg-blue-50 rounded-xl px-6 py-4 shadow-inner border-t-2 border-blue-200">
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
  );
}
