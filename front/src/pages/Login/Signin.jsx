import React from 'react';
import SocialLogin from './SocialLogin';

const SignIn = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sign In</h1>
        <h2>DevConf Board</h2>
        <p>소셜 플랫폼 계정을 통해 간편 로그인 하세요.</p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default SignIn;