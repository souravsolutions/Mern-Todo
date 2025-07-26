import React, { useState } from "react";
import myimage from "../assets/myimage.gif";
import google from "../assets/google.jpg";
import github from "../assets/github.svg";
import { Link, useNavigate } from "react-router";
import ApiClient from "../Service/apiClient.js";

function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate()

  const signUpHandler = async (e) => {
    e.preventDefault();
        try {
          const res = await ApiClient.signUp(username, email, password)
          console.log("Login Success:", res.data);
          navigate("/login")
        } catch (error) {
          console.log(error)
        }
  };
  return (
    <div className='h-screen bg-[#ccdbff] flex justify-center items-center'>
      <div className='h-180 w-300 bg-[#ffffff] rounded-lg shadow-lg flex p-10'>
        <div className='w-1/2 p-5'>
          <img
            src={myimage}
            className='w-full h-full object-cover rounded-lg'
          />
        </div>
        <div className='w-1/2 p-5 flex justify-center flex-col items-center'>
          <h1 className='text-5xl font-bold'>Sign In</h1>

          <div className='h-80 w-full flex flex-col justify-between p-10'>
            <div className='flex flex-col'>
              <p className='text-xl'>Username</p>
              <input
              type="text"
              value={username}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='flex flex-col'>
              Email
              <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' 
              />
            </div>
            <div className='flex flex-col'>
              Password
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword (e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' 
              />
            </div>
          </div>

          <div className='flex gap-10'>
            <button className='flex items-center justify-center gap-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-4 py-2 shadow hover:bg-white transition w-40 h-10'>
              <img src={google} className='w-7 h-full' />
              Google
            </button>
            <button className='flex items-center justify-center gap-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-4 py-2 shadow hover:bg-white transition w-40 h-10'>
              <img src={github} className='w-7 h-full' />
              Github
            </button>
          </div>
          <button
            className='bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition mt-5 w-95'
            onClick={signUpHandler}
          >
            Sign up
          </button>
          <div className='mt-10'>
            <Link
              className='underline decoration-blue-600 text-blue-500'
              to='/login'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
