import React from 'react';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <>
      {/* Фон модального окна */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999,
        }}
        onClick={onClose}
      />
      {/* Само модальное окно */}
      <div
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          padding: 24,
          borderRadius: 8,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          minWidth: 320,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;