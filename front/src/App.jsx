import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import DevBoard from './pages/DevBoard/DevBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dev-board" element={<DevBoard />} />
      </Routes>
    </Router>
  )
}

export default App
