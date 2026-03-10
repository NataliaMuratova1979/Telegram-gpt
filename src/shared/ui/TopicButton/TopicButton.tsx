import React from 'react';
import { ITopic } from '../../../api/types'

interface TopicButtonProps {
  topic: ITopic; // объект темы
  onClick?: (topic: ITopic) => void; // коллбэк при клике
}

const TopicButton: React.FC<TopicButtonProps> = ({ topic, onClick }) => {
  return (
    <button onClick={() => onClick && onClick(topic)} style={{ padding: '8px 16px' }}>
      {topic.topic}
    </button>
  );
};

export default TopicButton;