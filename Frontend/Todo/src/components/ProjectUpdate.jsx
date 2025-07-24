import React, { useState } from "react";

function UpdateProject({ oldName, onClose, onUpdate, id }) {
  const [name, setName] = useState(oldName);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name is required");
      return;
    }

    try {
      await onUpdate(id, name);
    } catch (err) {
      setError("Update failed");
    }
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50'>
      <div className='bg-white/10 backdrop-blur-md p-6 rounded-2xl w-[90%] max-w-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20'>
        <button
          className='text-sm text-blue-300 hover:underline mb-4'
          onClick={onClose}
        >
          ← Back
        </button>

        <h2 className='text-2xl font-semibold text-white mb-5'>
          Update Project
        </h2>

        <form onSubmit={handleUpdate} className='space-y-4'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full bg-white/20 text-white placeholder:text-white/60 border border-white/30 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            placeholder='Enter new project name'
          />

          {error && <p className='text-red-400 text-sm'>{error}</p>}

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

export default UpdateProject;
