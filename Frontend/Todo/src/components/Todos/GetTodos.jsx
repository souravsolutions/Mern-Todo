import React, { useEffect, useState } from "react";
import ApiClient from "../../Service/apiClient.js";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBack2Fill } from "react-icons/ri";
import UpdateTodos from "./UpdateTodos";

function GetTodos({ todos, getTodos }) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const toggleComplete = async (todoId) => {
    try {
      const todo = todos.find((t) => t._id === todoId);
      await ApiClient.UpdateTodos(todoId, todo.title, !todo.completed);
      getTodos();
    } catch (err) {
      console.error("Failed to toggle complete:", err);
    }
  };

  const handelDelete = async (todoId) => {
    try {
      await ApiClient.DeleteTodo(todoId);
      getTodos();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const openUpdateModal = (todo) => {
    setCurrentTodo(todo);
    setIsUpdateOpen(true);
  };

  return (
    <div className='bg-[#1a1c1e] p-6 rounded-xl shadow-lg '>
      <h2 className='text-2xl font-bold mb-4 text-center'>Todos</h2>

      <ul className='space-y-3'>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`bg-[#2a2e33] p-4 rounded-lg flex justify-between items-center ${
              todo.completed ? "opacity-50 bg-green-200" : ""
            }`}
          >
            <div className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id)}
                className='w-5 h-5 accent-green-500 cursor-pointer'
              />
              <span
                className={`text-lg ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </span>
            </div>

            <div className='flex gap-3 text-xl'>
              <button
                onClick={() => openUpdateModal(todo)}
              >
                <FaPencil />
              </button>

              <button
                className={` ${todo.completed ? "text-shadow-white" : "text-red-500 hover:text-red-400"}`}
                onClick={() => handelDelete(todo._id)}
                
              >
                <RiDeleteBack2Fill/>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isUpdateOpen && (
        <UpdateTodos
          todo={currentTodo}
          onClose={() => setIsUpdateOpen(false)}
          onUpdated={getTodos}
        />
      )}
    </div>
  );
}

export default GetTodos;
