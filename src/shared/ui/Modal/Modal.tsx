// src/components/Modal.tsx
import React from 'react';
import { ModalProps } from './types';
import styles from './Modal.module.css';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div
        className={`${styles['modal-container']} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles['modal-header']}>
            <span>{title}</span>
            {/* Крестик для закрытия */}
            <button className={styles['modal-close']} onClick={onClose}>×</button>
          </div>
        )}
        <div className={styles['modal-content']}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;