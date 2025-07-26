import React, { useEffect, useState } from "react";
import ApiClient from "../../../Service/apiClient.js";
import { Link } from "react-router-dom";
import UpdateProject from "./ProjectUpdate.jsx";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import book from "../../assets/book2.png";

function AllProjects({ projects, setProjects }) {
  const [error, setError] = useState("");
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const remove = async (id) => {
    try {
      const res = await ApiClient.deleteProject(id);
      setProjects((prev) => prev.filter((pro) => pro._id !== id));
    } catch (error) {
      setError("Failed to delete project");
    }
  };

  const openUpdate = (project) => {
    setCurrentProject(project);
    setIsUpdateOpen(true);
  };

  const handleUpdateProject = async (id, name) => {
    try {
      await ApiClient.updateProject(id, name);

      const res = await ApiClient.getProjects();
      setProjects(res.data.data);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className='mt-6'>
      <h2 className='mb-4 font-Winky font-bold text-3xl ml-10 text-white font-rodies'>
        Projects
      </h2>

      {error && <p className='text-red-400 ml-10'>{error}</p>}

      <ul className='space-y-4'>
        {projects.map((project) => (
          <li
            key={project._id}
            className='p-5 bg-[#1a1c1e] rounded-xl border border-[#2a2d30]/50 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition text-white mx-4'
          >
            <div className='flex items-center gap-6'>
              <img
                src={book}
                alt='Project'
                className='w-20 h-20 object-contain'
              />

              <div className='flex-1'>
                <Link to={`/project/${project._id}`} className='block'>
                  <h3 className='text-2xl font-semibold mb-2'>
                    {project.name}
                  </h3>
                </Link>

                <div className='flex justify-between items-center'>
                  <p className='text-sm text-gray-400'>
                    Created at:{" "}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>

                  <div className='flex gap-4'>
                    <button
                      className='bg-red-500 text-white px-3 py-1 rounded'
                      onClick={() => remove(project._id)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className='bg-blue-500 text-white px-3 py-1 rounded'
                      onClick={() => openUpdate(project)}
                    >
                      <FaPencil />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {isUpdateOpen && currentProject?._id === project._id && (
              <UpdateProject
                id={currentProject._id}
                oldName={currentProject.name}
                onClose={() => setIsUpdateOpen(false)}
                onUpdate={handleUpdateProject}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProjects;
