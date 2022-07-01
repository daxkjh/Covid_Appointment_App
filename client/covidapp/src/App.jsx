import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Route,Routes,BrowserRouter, Outlet} from "react-router-dom"
import Login from './pages/Login'
import Secret from './pages/tutorial/Secret'
import Home from './pages/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
  
 <BrowserRouter>
 
 <Routes>
  <Route path="/" element={<Home/>}>
    <Route path="/login" element={<Login/>}/>
    <Route path="/secret" element={<Secret/>}/>
  </Route>
 </Routes>

 </BrowserRouter>
  )
}

export default App
