import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import ApiClient from "../../Service/apiClient.js";
import { TiHome } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import Project from "./Projects/Project.jsx";
import AllProjects from "./Projects/AllProjects.jsx";
import chicken from "../assets/chicken.gif";

function Home() {
  const [user, setUser] = useState(null);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await ApiClient.getMe();
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    getMe();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ApiClient.getProjects();
        setProjects(res.data.data);
      } catch (err) {
        console.error("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className='h-screen grid grid-cols-[auto_1fr_400px] gap-5 p-10 min-h-screen bg-gradient-to-br from-[#141517] via-[#1a1c1f] to-[#202428] text-white overflow-hidden '>
      {/* side bar */}
      <div className='h-full w-30 bg-gradient-to-b from-[#1a1c1e]/90 to-[#121417]/95 rounded-3xl backdrop-blur-sm border border-[#2a2d30]/40 shadow-[0_15px_50px_rgba(0,0,0,0.3),-10px_-10px_25px_3px_rgba(20,20,20,0.1),10px_10px_25px_3px_rgba(0,0,0,0.2)] flex flex-col py-10 items-center justify-between mr-20 transition-all duration-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.5)]'>
        <div className='relative group'>
          <h1 className='font-bold text-5xl text-white drop-shadow-lg font-logo'>
            T
          </h1>
        </div>

        <div className='flex flex-col items-center gap-8'>
          <Link
            className='text-white text-3xl p-4 rounded-2xl hover:bg-[#2c2f33]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center'
            to='/home'
          >
            <TiHome />
          </Link>
          <Link
            className='text-white text-3xl p-4 rounded-2xl hover:bg-[#2c2f33]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center'
            to=''
          >
            <FaRegUser />
          </Link>
          <Link className='text-white text-3xl p-4 rounded-2xl hover:bg-[#2c2f33]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center'>
            <IoMdSettings />
          </Link>
        </div>

        <Link className='text-white text-3xl p-4 rounded-2xl hover:bg-[#2c2f33]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center'>
          <IoIosLogOut />
        </Link>
      </div>

      <div className='h-full w-full flex flex-col gap-6 overflow-hidden'>
        {/* user login box ekhane login kina dekhabe */}
        <div className='h-65 bg-gradient-to-r from-[#1a1c1e]/80 to-[#23272f]/50 flex justify-between items-center pl-20 pr-30 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-6xl font-bold font-Name'>
              Hello{" "}
              {user ? (
                <span className=''>{user.username}</span>
              ) : (
                "Logging First"
              )}
            </h1>
            <h1 className='font-winky opacity-50 text-xl'>
              It's good to see you again
            </h1>
          </div>
          <img
            src={chicken}
            className='h-60 mix-blend-screen brightness-125 contrast-125 saturate-150 drop-shadow-2xl'
            alt='Hi'
          />
        </div>

        {/* sob Project gulo show korachi */}
        <div className="flex-1 pr-3 overflow-y-scroll hide-scrollbar font-ui">
          <AllProjects projects={projects} setProjects={setProjects} />
        </div>
      </div>

      <div className='h-full p-2 flex flex-col pt-5 justify-between'>
        <button
          className='bg-[#1a1c1e] hover:bg-[#2a2e33] text-white px-5 py-2.5 rounded-xl text-lg border border-[#3a3f45] shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_6px_18px_rgba(0,0,0,0.5)] hover:scale-105 font-rodies'
          onClick={() => setIsProjectOpen(true)}
        >
          +Create Project
        </button>

        <div></div>
        <div></div>

        {isProjectOpen && (
          <Project
            setIsProjectOpen={setIsProjectOpen}
            setProjects={setProjects}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
