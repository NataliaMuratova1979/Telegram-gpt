import React from 'react';

interface BackButtonProps {
  onBack: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button type="button" onClick={onBack}>
      Вернуться
    </button>
  );
};

export default BackButton;