import React, { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext.jsx";
import { Link, NavLink } from "react-router";
import ApiClient from "../../Service/apiClient.js";
import profile from "../assets/profile.jpeg";
import { TiHome } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import hi from "../assets/hi.svg"

function Home() {
  const [user, setUser] = useState(null);

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

  return (
    <div className='h-screen grid grid-cols-[auto_1fr_400px] gap-5 p-10'>
      <div className='h-full w-30 bg-black rounded-3xl shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,0,0,0.15)] flex flex-col py-10 items-center justify-between mr-20'>
        <h1 className='font-Winky font-bold text-6xl text-white'>T</h1>
        <div className='flex flex-col items-center gap-10'>
          <Link className='text-white text-3xl'>
            <TiHome />
          </Link>
          <Link className='text-white text-3xl'>
            <FaRegUser />
          </Link>
          <Link className='text-white text-3xl'>
            <IoMdSettings />
          </Link>
        </div>
        <Link className='text-white text-3xl'>
          <IoIosLogOut />
        </Link>
      </div>

      <div className='h-full w-full p-5'>
        <div className='h-50 bg-gray-200 flex justify-between items-center pl-40 pr-30'>
         <div className="flex flex-col gap-3">
          <h1 className="font-winky text-5xl">Hello {user ? <span className="font-bold">{user.username}</span> : "Logging First"}</h1>
          <h1 className="font-winky opacity-50 text-xl">Its good to see you again</h1>
         </div>
         <img src={hi}></img>
        </div>
      </div>

      <div className='h-full'></div>
    </div>
  );
}

export default Home;
