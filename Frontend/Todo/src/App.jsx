import { useState } from 'react'
import { Routes, Route } from "react-router"
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/register" element = {<SignUp/>}/>
        <Route path="/login" element = {<Login/>}/>
      </Routes>
    </>
  )
}

export default App
