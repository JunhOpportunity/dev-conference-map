import React, { useState } from 'react';
import './auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    interests: []
  });

  const interestOptions = [
    { id: 'online', label: '온라인' },
    { id: 'offline', label: '오프라인' },
    { id: 'education', label: '교육' },
    { id: 'ai', label: 'AI' },
    { id: 'frontend', label: '프론트엔드' },
    { id: 'backend', label: '백엔드' },
    { id: 'ios', label: 'iOS' },
    { id: 'android', label: '안드로이드' },
    { id: 'security', label: '보안' },
    { id: 'data', label: '데이터' },
    { id: 'infra', label: '인프라' }
  ];

  const handleInterestChange = (id) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(item => item !== id)
        : [...prev.interests, id]
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-box signup">
        <h1>Sign Up</h1>
        <form>
          <input
            type="email"
            placeholder="이메일 주소"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="text"
            placeholder="유저명"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <div className="interests-section">
            <p>관심 분야</p>
            <div className="checkbox-grid">
              {interestOptions.map(option => (
                <label key={option.id}>
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(option.id)}
                    onChange={() => handleInterestChange(option.id)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;