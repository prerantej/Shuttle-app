import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input type="email" name="email" placeholder="Email" required
          className="w-full p-2 border rounded mb-4" onChange={handleChange} />

        <input type="password" name="password" placeholder="Password" required
          className="w-full p-2 border rounded mb-4" onChange={handleChange} />

        <button className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700">
          Log In
        </button>
      </form>
    </div>
  );
}
