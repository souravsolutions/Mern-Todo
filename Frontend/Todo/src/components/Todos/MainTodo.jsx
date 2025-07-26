import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import ApiClient from "../../../Service/apiClient.js";
import { useParams } from "react-router";
import GetTodos from "./GetTodos.jsx";

function MainTodo() {
  const [task, setTask] = useState("");
  const { projectId } = useParams();
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);

  const handelSubmit = async () => {
    if (!task.trim()) return;

    try {
      const res = await ApiClient.createTodos(task, projectId);
      setTask("");
      getTodos();
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const getTodos = async () => {
    try {
      const res = await ApiClient.getTodos(projectId);
      setTodos(res.data.data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [projectId]);

  return (
    <div className='h-screen w-full bg-gradient-to-br from-[#141517] via-[#1a1c1f] to-[#202428] text-white flex flex-col p-10 items-center'>
      <div className='w-150 flex items-center'>
        <input
          type='text'
          placeholder='Enter your task'
          onChange={(e) => setTask(e.target.value)}
          className='w-full bg-[#2a2e33] text-white border border-[#3a3f45] p-3 rounded-l-md outline-none focus:ring-2 focus:ring-blue-500/30 text-xl'
        />
        {error && <p className='text-red-500 mt-4'>{error}</p>}
        <button
          onClick={handelSubmit}
          className='bg-[#2a2e33] text-white border border-[#3a3f45] rounded-r-md text-xl p-4'
        >
          <IoMdAdd />
        </button>
      </div>
      <div className='w-full max-w-xl m-10'>
        <GetTodos todos={todos} getTodos={getTodos}/>
      </div>
      <div></div>
    </div>
  );
}

export default MainTodo;
