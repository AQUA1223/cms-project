import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200 relative overflow-hidden font-serif text-lg">
      {/* Animated sticky notes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-36 bg-yellow-300 rounded-xl shadow-2xl rotate-[-8deg] opacity-90 transition-transform duration-300 hover:scale-110 hover:rotate-[-2deg]"></div>
        <div className="absolute top-40 right-20 w-44 h-32 bg-pink-400 rounded-xl shadow-2xl rotate-6 opacity-80 transition-transform duration-300 hover:scale-110 hover:rotate-2"></div>
        <div className="absolute bottom-24 left-32 w-40 h-28 bg-green-300 rounded-xl shadow-2xl rotate-3 opacity-80 transition-transform duration-300 hover:scale-110 hover:rotate-0"></div>
        <div className="absolute bottom-10 right-36 w-36 h-24 bg-purple-300 rounded-xl shadow-2xl rotate-[-5deg] opacity-80 transition-transform duration-300 hover:scale-110 hover:rotate-[-1deg]"></div>
        <div className="absolute top-1/2 left-1/2 w-52 h-40 bg-orange-300 rounded-xl shadow-2xl -translate-x-1/2 -translate-y-1/2 rotate-2 opacity-70 transition-transform duration-300 hover:scale-110 hover:rotate-6"></div>
      </div>
      <div className="relative z-10 max-w-screen-md mx-auto p-12 bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl border-4 border-blue-400">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight text-blue-800 font-serif drop-shadow-lg">
          KeepNotes
        </h1>
        <h4 className="text-3xl font-semibold text-pink-700 mb-4 font-serif">
          Your Colorful Notes Organizer
        </h4>
        <p className="text-2xl text-gray-700 mb-8 font-serif">
          Capture, organize, and access your notes anywhere. <span className="text-blue-600 font-bold">KeepNotes</span> helps you stay productive and never forget an idea again.
        </p>
        <div className="flex gap-6">
          <Link
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:bg-gradient-to-l transition-all duration-300 text-2xl font-serif"
            to='/login'
            rel="noopener noreferrer"
          >
            Get Started
          </Link>
          <Link
            className="inline-flex items-center px-8 py-4 bg-yellow-300 text-yellow-900 font-bold rounded-2xl shadow-lg hover:scale-105 hover:bg-yellow-400 transition-all duration-300 text-2xl font-serif"
            to="#"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
