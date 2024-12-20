import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import DevBoard from './pages/DevBoard/DevBoard';
import PostDetail from './pages/DevBoard/PostDetail';
import DevConf from './pages/DevConf/DevConf';
import NavigationBar from './components/layout/NavigationBar';
import MyPage from './pages/Mypage/Mypage';
import SignIn from './pages/Login/Signin';
import SignUp from './pages/Login/SignUp';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dev-board" element={<DevBoard />} />
        <Route path="/dev-board/:postId" element={<PostDetail />} />
        <Route path="/dev-conf" element={<DevConf />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
