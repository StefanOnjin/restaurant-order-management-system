import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import NavBar from "./components/NavBar.jsx"
import Login from "./components/Login.jsx"
import TestComponent from "./components/TestComponent.jsx"
import './App.css'
import { AuthProvider } from './components/AuthContext.jsx'
import Register from './components/Register.jsx'
import MenuList from './components/MenuList.jsx'

function App() { 
  const [messages, setMessages] = useState([]); 

  useEffect(() => {
    axios.get("http://localhost:5000/api/test") 
      .then(res => setMessages(res.data)) 
      .catch(err => console.error("Greska:", err));
  }, []);

  return (
    <Router>
      <AuthProvider>
        <NavBar /> 
      <main>
        <Routes>
          <Route path="/" element={<MenuList />} /> 
          <Route path="/menu" element={<MenuList />} />  
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/test" element={<TestComponent />} />
        </Routes>
      </main>

      </AuthProvider>
      
    </Router>    
  ); 
}

export default App
