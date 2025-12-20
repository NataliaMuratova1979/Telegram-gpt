// src/types/Modal.types.ts
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}