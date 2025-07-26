import React, { useState, useEffect } from "react";
import ApiClient from "../../../Service/apiClient";

function UpdateTodos({ todo, onClose, onUpdated }) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    }
  }, [todo]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await ApiClient.UpdateTodos(todo._id, title, completed); 
      onUpdated();
      onClose();
    } catch (err) {
      setError("Update failed");
    }
  };

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'>
      <div className='bg-white/10 backdrop-blur-md p-6 rounded-2xl w-[90%] max-w-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20'>
        <button
          className='text-sm text-blue-300 hover:underline mb-4'
          onClick={onClose}
        >
          Back
        </button>

        <h2 className='text-2xl font-semibold text-white mb-5'>
          Update Todo
        </h2>

        <form onSubmit={handleUpdate} className='space-y-4'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full bg-white/20 text-white placeholder:text-white/60 border border-white/30 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            placeholder='Enter new title'
          />

          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition'
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTodos;


