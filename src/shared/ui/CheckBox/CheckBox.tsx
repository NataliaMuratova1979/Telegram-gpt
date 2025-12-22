// src/components/Checkbox.tsx
import React from 'react';
import styles from './Checkbox.module.css';
import { CheckboxProps } from './types';

const CheckBox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  id,
  className = '',
}) => {

  const handleInputChange = () => {
    if (!disabled) {
      const newChecked = !checked;
      console.log(`Checkbox "${label}" отмечен: ${newChecked}`);
      onChange(newChecked);
    }
  };

  return (
    <label className={`${styles.checkboxContainer} ${className}`} htmlFor={id}>
      <div
        className={`${styles.checkbox} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}
        onClick={handleInputChange}
      >
        {checked && <span className={styles.checkmark}>✓</span>}
      </div>
      <span>{label}</span>
    </label>
  );
};

export default CheckBox;