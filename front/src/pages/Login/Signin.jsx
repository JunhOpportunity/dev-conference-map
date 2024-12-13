import React, { useState } from 'react';
import './SignIn.css'; 
import { API_ENDPOINTS } from '../../apis/apiEndpoints';
import { useDispatch } from "react-redux";
import { addUser } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch(); // 컴포넌트 내부에서 useDispatch 선언

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
  
      const userData = await response.json();
      console.log("로그인 성공:", userData);
  
      // interest 문자열을 배열로 변환
      const interestArray = userData.interest
        ? userData.interest.split(", ").map((item) => item.trim())
        : []; // interest가 없을 경우 빈 배열
  
      // Redux에 전달할 사용자 데이터 가공
      const user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        interest: interestArray,
        wishlist: userData.wishlist || [],
        posts: userData.posts || [],
      };
  
      // Redux에 사용자 정보 저장
      dispatch(addUser(user));
      
      navigate("/"); // 마이페이지로 이동
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
