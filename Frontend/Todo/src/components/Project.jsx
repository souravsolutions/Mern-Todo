import React, { useState } from "react";
import ApiClient from "../../Service/apiClient.js";
import { Link } from "react-router";

function Project({ setIsProjectOpen }) {
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

      setName("");
    } catch (error) {
      setError(error.response.data.message || "Project creation failed");
    }
  };

  return (
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50'>
  <div className='bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl'>
    <h2 className='text-2xl font-bold mb-4'>Create New Project</h2>
    <form onSubmit={handleSubmit} className='space-y-4'>
      <input
        type='text'
        placeholder='Project Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full border p-2 rounded'
      />
      {error && <p className='text-red-500 text-lg'>{error}</p>}
      {message && <p className='text-green-600 text-lg'>{message}</p>}

      <div className='flex justify-between'>
        <button
          type='button'
          className='px-4 py-2 bg-gray-200 text-black rounded'
          onClick={() => setIsProjectOpen(false)}
        >
          Back
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-black text-white rounded'
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
