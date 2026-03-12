import React from 'react';
import { Button } from '../../shared/ui/Button'; // используем ваш общий компонент Button

export type TopicButtonProps = {
  topic: string;                   // название темы, которое отображается на кнопке
  onSelect?: (topic: string) => void; // обработчик клика по кнопке
  disabled?: boolean;
};

export const TopicButton: React.FC<TopicButtonProps> = ({ topic, onSelect, disabled }) => {
  return (
    <Button
      onClick={() => onSelect?.(topic)}
      disabled={disabled}
      htmlType="button"
      style={{ padding: '8px 12px' }} // можно подогнать стиль
    >
      {topic}
    </Button>
  );
};

export default TopicButton;