import React from 'react';
import styles from './CloseButton.module.css';

type ActionType = 'close' | 'exit';

interface CloseButtonProps {
  onClose?: () => void;
  onExit?: () => void;
  actionType?: ActionType;
  ariaLabel?: string;
  onClick?: () => void; // Добавлено
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClose,
  onExit,
  actionType = 'close',
  ariaLabel = 'Закрыть',
  onClick, // Добавлено
}) => {
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      if (actionType === 'close' && onClose) {
        onClose();
      } else if (actionType === 'exit' && onExit) {
        onExit();
      }
    }
  };

  return (
    <button className={styles.button} onClick={handleClick} aria-label={ariaLabel} />
  );
};