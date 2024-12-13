import React from 'react';
import './auth.css';

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    // Google OAuth login
  };

  const handleGithubLogin = () => {
    // GitHub OAuth login
  };

  return (
    <div className="social-login">
      <button onClick={handleGoogleLogin} className="google-btn">
        <img src="/google-icon.svg" alt="Google" />
        Sign in with Google
      </button>
      <button onClick={handleGithubLogin} className="github-btn">
        <img src="/github-icon.svg" alt="GitHub" />
        Sign in with GitHub
      </button>
    </div>
  );
};

export default SocialLogin;