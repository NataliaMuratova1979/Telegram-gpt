// src/types/Modal.types.ts
import { ReactNode } from 'react'; // Импорт типа ReactNode для определения типов React-элементов и компонентов

// Тип для определения типа модального окна
export type TModalType = 'option' | 'answer'; // Для выбора опции или для выполнения задания

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  modalType: TModalType; // Тип модального окна ('option' | 'task')

  title?: string;
  children?: React.ReactNode;
  className?: string;
  closeOnEsc?: boolean; // Можно ли закрыть кликом по клавише Escape
  closeOnOverlay?: boolean; // Можно ли закрыть при клике на оверлей (по умолчанию зависит от реализации)
  actions?: ReactNode; // Необязанные действия (кнопки, ссылки)
  onSubmit?: () => void; // Обычно для формы / кнопки «Отправить» или мониторинг действий
   // Для кнопок «Правильно» и «Неправильно»
  correctButtonLabel?: string; // например, "Правильно"
  wrongButtonLabel?: string;   // например, "Неправильно"
  onCorrect?: () => void; // обработчик для кнопки «Правильно»
  onWrong?: () => void; // обработчик для кнопки «Неправильно»
}




