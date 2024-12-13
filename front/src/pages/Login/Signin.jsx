import React, { useState } from 'react';
import './SignIn.css'; 
import { signIn } from './api';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      console.log('로그인 성공:', response);
      // 성공 처리 로직 -> 메인 페이지로 이동 onClick={() => navigate("/home")
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1>Sign In</h1>
        <p>개발자 컨퍼런스 모아보기에 로그인하세요.</p>
        <form onSubmit={handleSubmit} className="signin-content">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="signin-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className="signin-input"
            required
          />
          <button type="submit" className="register-button">로그인</button>
        </form>
      </div>
    </div>
  );  
};

export default SignIn;
