import React, { useState } from 'react';
import './SignUp.css';
import { API_ENDPOINTS } from '../../apis/apiEndpoints';
import { useDispatch } from "react-redux";
import { addUser } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    interest: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      interest: checked
        ? [...prevData.interest, value]
        : prevData.interest.filter(interest => interest !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // interests 배열을 쉼표로 구분된 문자열로 변환
    const formattedFormData = {
      ...formData,
      interest: formData.interest.join(", ")
    };

    try {
      // 회원가입 요청
      const response = await fetch(API_ENDPOINTS.USER.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedFormData),
      });

      console.log("Submitted Data:", formattedFormData);

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      navigate("/signin"); // 로그인 페이지로 이동

    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="auth-container">
      <nav className="navbar">
        <div className="logo">Logo</div>
      </nav>
      <div className="auth-content">
        <h1>Sign Up</h1>
        <h2>Create your account</h2>
        <p>컨퍼런스 소식을 구독받을 메일을 입력하세요.</p>
      </div>
      <div className="signup-content">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="사용자명"
            value={formData.name}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <div className="interests-section">
            <h3>관심 분야</h3>
            {['온라인', '오프라인', 'iOS', '안드로이드', '보안', '교육', 'AI', '프론트엔드', '백엔드', '데이터', '인프라'].map((interest) => (
              <label key={interest} className="interest-label">
                <input
                  type="checkbox"
                  value={interest}
                  checked={formData.interest.includes(interest)}
                  onChange={handleInterestChange}
                  className="interest-checkbox"
                />
                <span className="checkmark"></span>
                {interest}
              </label>
            ))}
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
