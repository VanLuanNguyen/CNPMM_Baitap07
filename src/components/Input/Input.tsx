import React from 'react';
import { InputProps } from '../../types';

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
  className = '',
  label,
  error,
}) => {
  const inputClasses = [
    'input',
    error ? 'input--error' : '',
    disabled ? 'input--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
