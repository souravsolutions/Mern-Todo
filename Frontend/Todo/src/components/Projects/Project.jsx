import React, { useState } from "react";
import ApiClient from "../../../Service/apiClient.js";
import { Link, useNavigate } from "react-router";

function Project({ setIsProjectOpen, setProjects }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter a project name");
      return;
    }

    try {
      const res = await ApiClient.createProject(name);

      setMessage(res.data.message);

      setProjects((prev) => [...prev, res.data.data]);

      setName(" ");

      setIsProjectOpen(false);
    } catch (error) {
      setError(error.response.data.message || "Project creation failed");
    }
  };

  return (
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-[#1a1c1e] p-6 rounded-2xl w-[90%] max-w-md shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-white'>
        <h2 className='text-2xl font-bold mb-4'>Create New Project</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            placeholder='Project Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full bg-[#2a2e33] text-white border border-[#3a3f45] p-2 rounded outline-none focus:ring-2 focus:ring-blue-500/30'
          />
          {error && <p className='text-red-400 text-lg'>{error}</p>}
          {message && <p className='text-green-400 text-lg'>{message}</p>}

          <div className='flex justify-between'>
            <button
              type='button'
              className='px-4 py-2 bg-[#2c2f33] text-white rounded-md hover:bg-[#3a3f45] transition-all duration-300'
              onClick={() => setIsProjectOpen(false)}
            >
              Back
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300'
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Project;
