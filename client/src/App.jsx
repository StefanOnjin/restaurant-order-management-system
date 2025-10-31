import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import NavBar from "./components/NavBar.jsx"

import TestComponent  from './components/testComponent.jsx' 
import './App.css'

function App() {
  const user = { name: "Stefan" }; 
  const cartCount = 2;

  return (
    <Router>
      <NavBar user={user} cartCount={cartCount} />
    </Router>    
  ); 
}

export default App
