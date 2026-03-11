import React from 'react';

interface WordLengthFilterProps {
  minLength: number;
  maxLength: number;
  onMinLengthChange: (value: number) => void;
  onMaxLengthChange: (value: number) => void;
}

export const WordLengthFilter: React.FC<WordLengthFilterProps> = ({
  minLength,
  maxLength,
  onMinLengthChange,
  onMaxLengthChange,
}) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <h4>Настройка длины слова</h4>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <label>Минимальная длина:</label>
          <input
            type="number"
            value={minLength}
            onChange={(e) => onMinLengthChange(Number(e.target.value))}
            min={1}
          />
        </div>
        <div>
          <label>Максимальная длина:</label>
          <input
            type="number"
            value={maxLength}
            onChange={(e) => onMaxLengthChange(Number(e.target.value))}
            min={1}
          />
        </div>
      </div>
    </div>
  );
};