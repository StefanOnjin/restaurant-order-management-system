import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react' 
import axios from "axios" 

import NavBar from "./components/NavBar.jsx"

import TestComponent  from './components/testComponent.jsx' 
import './App.css'

function App() { 
  
  const [messages, setMessages] = useState([]); 

  const user = { name: "Stefan" }; 
  const cartCount = 2; 

  useEffect(() => {
    axios.get("http://localhost:5000/api/test") 
      .then(res => setMessages(res.data)) 
      .catch(err => console.error("Greska:", err));
  }, []);

  return (
    <Router>
      <NavBar user={user} cartCount={cartCount} /> 
        <h2>Odgovor sa servera: 
          <ul>
            {messages.map(item => (
              <li key={item.id}>{item.message}</li>
            ))}
          </ul> 
        </h2>
    </Router>    
  ); 
}

export default App
