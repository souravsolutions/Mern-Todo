import React, { useEffect, useState } from 'react'
import { useUser } from "../context/AuthContext.jsx"
import { Link } from "react-router"
import ApiClient from '../../Service/apiClient.js';

function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getMe =  async() => {
      
      try {
        const res = await ApiClient.getMe();
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }

    getMe()
  },[])

  return (
    <nav className="bg-white shadow px-4 py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Todo App</h1>
        {user ? (
          <span className="text-blue-600 font-medium">Welcome, {user.username}</span>
        ) : (
          <Link to="/login" className="text-gray-700 underline">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Home