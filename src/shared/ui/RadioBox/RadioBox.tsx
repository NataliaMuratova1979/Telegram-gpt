import React from 'react';
import { RadioBoxProps } from './types';
import styles from './RadioBox.module.css';

const RadioBox: React.FC<RadioBoxProps> = ({
  options,
  selectedValue,
  onChange,
  name,
  disabled,
}) => {
  const handleChange = (value: string) => {
    console.log(`Выбрана опция: ${value}`); // Логируем выбранное значение
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`${styles.label} ${disabled ? styles.disabled : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            disabled={disabled}
            className={styles.radio}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioBox;