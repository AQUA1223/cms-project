import { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PATHS = [
    { path: '/dashboard/intro', text: 'Intro' },
    { path: '/dashboard/todo-list', text: 'New Notes' },
    { path: '/dashboard/savednotes', text: 'Saved Notes' }, // Added Saved Notes link
];

export default function DashboardLayouts() {
    const location = useLocation();
    const { logout } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [hoveringEdge, setHoveringEdge] = useState(false);

    const showSidebar = sidebarOpen || hoveringEdge;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 relative">
            {/* Hover area at the left edge */}
            <div
                className="fixed top-0 left-0 h-full w-3 z-30"
                onMouseEnter={() => setHoveringEdge(true)}
                onMouseLeave={() => setHoveringEdge(false)}
            />
            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen z-40 transition-transform duration-300
                    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
                    p-8 w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-gray-900 flex flex-col items-center shadow-2xl border-r border-blue-800
                `}
                onMouseLeave={() => setHoveringEdge(false)}
            >
                {/* Close button for mobile/desktop */}
                <button
                    className="absolute top-4 right-4 text-white bg-blue-700 rounded-full p-2 hover:bg-blue-800 transition"
                    onClick={() => setSidebarOpen(false)}
                >
                    ✕
                </button>
                <span className="text-4xl font-extrabold mb-10 text-white tracking-widest drop-shadow-lg">
                    <span className="text-blue-400">D</span>ashboard
                </span>
                <nav className="flex flex-col gap-4 w-full">
                    {PATHS.map((value, index) => {
                        const isActive = location.pathname === value.path;
                        return (
                            <Link
                                key={index}
                                to={value.path}
                                style={isActive ? STYLE.active : STYLE.inactive}
                                className={`block px-5 py-3 rounded-xl font-semibold text-lg transition-all duration-200
                                    ${isActive
                                        ? "bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg text-white scale-105"
                                        : "hover:bg-blue-700 hover:text-white text-blue-200 bg-opacity-0"}`}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full"
                                        style={{
                                            background: isActive ? "#fff" : "#60a5fa",
                                            boxShadow: isActive ? "0 0 8px #fff" : "none"
                                        }}
                                    ></span>
                                    {value.text.charAt(0).toUpperCase() + value.text.slice(1)}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="mt-auto w-full flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center shadow-lg mb-2 border-4 border-blue-200">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.607 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    {/* About Link */}
                    <Link
                        to="/dashboard/about"
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg transition-all duration-200 tracking-wide text-center"
                    >
                        About
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl font-bold shadow-lg transition-all duration-200 tracking-wide"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            {/* Open sidebar button */}
            {!showSidebar && (
                <button
                    className="fixed top-6 left-3 z-50 bg-blue-700 text-white rounded-full p-3 shadow-lg hover:bg-blue-800 transition"
                    onClick={() => setSidebarOpen(true)}
                >
                    ☰
                </button>
            )}
            <main className="flex-1 min-h-screen overflow-auto p-12 bg-white/80 rounded-tl-3xl shadow-inner ml-0">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

const STYLE = {
    active: {
        color: "white",
        fontWeight: "bold",
        letterSpacing: "0.05em"
    },
    inactive: {
        color: "#bfdbfe"
    }
};