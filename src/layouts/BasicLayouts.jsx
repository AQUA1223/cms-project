import { Link, Outlet } from "react-router";

function BasicLayouts() {
    return (
        <>
            <header className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-5 shadow-lg flex flex-col sm:flex-row items-center justify-between px-8">
                <div className="text-3xl font-bold flex items-center gap-3 tracking-wide">
                    <Link to="/home" className="hover:scale-110 transition-transform duration-200">
                        <span role="img" aria-label="notes">📒</span>
                    </Link>
                    <span className="drop-shadow-lg">KEEP NOTES</span>
                </div>
                <nav className="mt-4 sm:mt-0 flex gap-4">
                    <Link
                        to="/login"
                        className="bg-white text-indigo-700 font-medium px-5 py-2 rounded-full shadow hover:bg-indigo-50 transition-colors duration-200 border border-white"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/sign-up"
                        className="bg-indigo-700 text-white font-medium px-5 py-2 rounded-full shadow hover:bg-indigo-800 transition-colors duration-200 border border-white"
                    >
                        Sign Up
                    </Link>
                </nav>
            </header>
            <main className="min-h-[70vh] bg-gradient-to-b from-white via-gray-50 to-gray-100 px-0 py-0">
                <Outlet />
            </main>
            <footer className="bg-white text-gray-500 py-5 text-center border-t shadow-inner">
                <span className="font-semibold">© {new Date().getFullYear()} Notes App.</span> All rights reserved.
            </footer>
        </>
    );
}

export default BasicLayouts;