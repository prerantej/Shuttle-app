import { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input type="text" name="name" placeholder="Name" required
          className="w-full p-2 border rounded mb-4" onChange={handleChange} />

        <input type="email" name="email" placeholder="Email" required
          className="w-full p-2 border rounded mb-4" onChange={handleChange} />

        <input type="password" name="password" placeholder="Password" required
          className="w-full p-2 border rounded mb-4" onChange={handleChange} />

        <select name="role" className="w-full p-2 border rounded mb-4" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
          Create Account
        </button>
        <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">Log in here</a>
        </p>

      </form>
    </div>
  );
}
