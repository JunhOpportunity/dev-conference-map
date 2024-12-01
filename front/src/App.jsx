import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import DevBoard from './pages/DevBoard/DevBoard';
import PostDetail from './pages/DevBoard/PostDetail';
import DevConf from './pages/DevConf/DevConf';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dev-board" element={<DevBoard />} />
        <Route path="/dev-board/:postId" element={<PostDetail />} />
        <Route path="/dev-conf" element={<DevConf />} />
      </Routes>
    </Router>
  )
}

export default App
