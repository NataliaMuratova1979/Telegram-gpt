import React from 'react';

interface LengthCheckBoxProps {
  label: string;                  // Текст метки
  checked: boolean;               // Статус чекбокса
  value: string;                  // Значение, которое будет добавлено/удалено
  onChange: (value: string, checked: boolean) => void;  // Обработчик изменения
}

/**
 * Универсальный компонент чекбокса для выбора длины слова с автоматическим управлением массивом
 */
const LengthCheckBox: React.FC<LengthCheckBoxProps> = ({ label, checked, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value, e.target.checked);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default LengthCheckBox;


// Обработка изменения чекбокса
const handleLengthChange = (value: string, checked: boolean) => {
  handleCheckbox(value, checked);
  setFormData(prev => {
    let newSelected = [...prev.selectedLength];
    if (checked) {
      if (!newSelected.includes(value)) {
        newSelected.push(value);
      }
    } else {
      newSelected = newSelected.filter(item => item !== value);
    }
    return { ...prev, selectedLength: newSelected };
  });
};