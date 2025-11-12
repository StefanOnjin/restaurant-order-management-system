import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import NavBar from "./components/NavBar.jsx"
import Login from "./components/Login.jsx"
import TestComponent from "./components/TestComponent.jsx"
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx'
import Register from './components/Register.jsx'
import MenuList from './components/MenuList.jsx'
import { CartProvider } from './context/CartContext.jsx' 
import Cart from './components/Cart'; 


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
        <CartProvider>
          <NavBar /> 
          <main>
            <Routes>
              <Route path="/" element={<MenuList />} /> 
              <Route path="/menu" element={<MenuList />} />  
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />}></Route> 
              <Route path="/cart" element={<Cart />} /> 
              <Route path="/test" element={<TestComponent />} />
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>
      
    </Router>    
  ); 
}

export default App
