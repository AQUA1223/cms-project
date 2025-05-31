import { useState, useContext } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';

export default function Sign_in() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
 
  function handleSubmit(event) {
    event.preventDefault();
    login(email, password);
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 font-sans text-lg relative overflow-hidden">
      {/* Simple animated motion background */}
      <img
        src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif"
        alt="Animated background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none z-0"
        style={{ zIndex: 0 }}
      />
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl animate-pulse z-0 motion-safe:animate-bounce" style={{ filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-pink-200 rounded-full opacity-20 blur-2xl animate-pulse z-0 motion-safe:animate-ping" style={{ filter: 'blur(60px)' }} />
      <div className="w-full max-w-md p-8 bg-white/80 rounded-2xl shadow-2xl backdrop-blur-md border border-blue-100 z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight font-serif">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6 font-medium text-xl">Sign in to your account</p>
          <div>
            <label htmlFor="email" className="block text-base font-medium text-blue-700 mb-1 font-serif">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400 transition text-lg font-mono"
              placeholder="you@email.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-blue-700 mb-1 font-serif">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-gray-400 transition text-lg font-mono"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-colors text-lg font-serif"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
