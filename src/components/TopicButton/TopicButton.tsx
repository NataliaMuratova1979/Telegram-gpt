import React from 'react';
import { Button } from '../../shared/ui/Button'; // ваш универсальный Button

export type TopicButtonProps = {
  topic: string;                       // Название темы для отображения на кнопке
  onSelect?: (topic: string) => void; // Обработчик клика по кнопке
  disabled?: boolean;
  style?: React.CSSProperties;         // inline стили, например, для подсветки
};

export const TopicButton: React.FC<TopicButtonProps> = ({
  topic,
  onSelect,
  disabled = false,
  style,
}) => {
  // Обработка клика: вызовем onSelect, если кнопка не заблокирована
  const handleClick = () => {
    if (disabled) return;
    onSelect?.(topic);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      htmlType="button"
      style={{
        padding: '12px 24px',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 6,
        minWidth: 120,
        userSelect: 'none',
        cursor: disabled ? 'default' : 'pointer',
        color: '#fff',
        transition: 'background-color 0.3s ease',
        ...style, // передаем цвет и другие стили
      }}
    >
      {topic}
    </Button>
  );
};

export default TopicButton;