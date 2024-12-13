import React, { useState } from 'react';
import './SignUp.css';
import { signUp } from './api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    interests: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      interests: checked
        ? [...prevData.interests, value]
        : prevData.interests.filter(interest => interest !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      console.log('회원가입 성공:', response);
      // 성공 처리 로직 -> 로그인 페이지로 이동 onClick={() => navigate("/signin")
    } catch (error) {
      console.error('회원가입 실패:', error);
      console.log(formData);
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
            name="username"
            placeholder="사용자명"
            value={formData.username}
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
                  checked={formData.interests.includes(interest)}
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