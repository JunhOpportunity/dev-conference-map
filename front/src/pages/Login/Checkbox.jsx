import React from 'react';
import './auth.css'

const Checkbox = ({ label, checked, onChange, ...props }) => {
  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
        {...props}
      />
      <span className="checkbox-text">{label}</span>
    </label>
  );
};

export default Checkbox;