import React, { useState } from 'react';
import api from '../api/api.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext.jsx'

export default function Signup() {
   const [name, setUsername] = useState('');
  const [email, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', { username:name,Email:email, password,repassword:password });
      const user = res.data.user
   setUser(user)
      
      navigate('/login');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
   <form
  onSubmit={handleSignup}
  className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md w-full max-w-sm mx-auto mt-20"
>
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Signup</h2>

  <input
    value={name}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="name"
    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />



  <input
    value={email}
    onChange={(e) => setUseremail(e.target.value)}
    placeholder="email"
    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <input
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type="password"
    placeholder="Password"
    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
  >
    Signup
  </button>

  <p className="text-sm text-gray-500 text-center mt-2">
    Already have an account?  <Link to="/login" className="text-blue-600 hover:underline cursor-pointer">
    Login
  </Link>
  </p>
</form>

  );
}