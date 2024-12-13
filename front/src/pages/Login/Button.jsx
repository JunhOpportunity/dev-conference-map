import React from 'react';

const Button = ({ children, onClick, variant = 'default', icon, ...props }) => {
  const buttonStyles = {
    default: 'button-default',
    social: 'button-social',
    register: 'button-register'
  };

  return (
    <button 
      className={`button ${buttonStyles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {icon && <img src={icon} alt="" className="button-icon" />}
      {children}
    </button>
  );
};

export default Button;