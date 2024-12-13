import React, { useState } from 'react';
import './SignIn.css'; 
import { API_ENDPOINTS } from '../../apis/apiEndpoints';
import { useDispatch } from "react-redux";
import { addUser } from '../../store/slices/userSlice';

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
  const dispatch = useDispatch();

  try {
    // 로그인 요청
    const response = await fetch(API_ENDPOINTS.USER.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("로그인에 실패했습니다");
    }

    const { userId } = await response.json();
    console.log("로그인 성공:", userId);

    // userId로 사용자 데이터 요청
    const userResponse = await fetch(`${API_ENDPOINTS.USER.GET}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      throw new Error("사용자 데이터를 가져오는데 실패했습니다");
    }

    const userData = await userResponse.json();
    console.log("사용자 데이터 가져오기 성공:", userData);

    // Redux에 사용자 데이터 업데이트
    dispatch(addUser(userData));
  } catch (error) {
    console.error("오류 발생:", error);
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
