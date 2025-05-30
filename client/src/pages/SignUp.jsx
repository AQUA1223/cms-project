import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);

  function handleSubmit(event) {
    event.preventDefault();
    register(email, password);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 font-serif text-lg">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-gray-200"
        >
          <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight font-serif">
            Create your account
          </h2>
          <div className="mb-6">
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2 font-serif">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg font-serif"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2 font-serif">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg font-serif"
              placeholder="Enter your password"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold text-xl shadow-md hover:from-blue-600 hover:to-purple-600 transition-all font-serif"
          >
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
}
