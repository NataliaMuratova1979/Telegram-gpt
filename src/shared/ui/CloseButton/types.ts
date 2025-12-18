// CloseButton.tsx
import React from 'react';

type ActionType = 'close' | 'exit';

interface CloseButtonProps {
  onClose?: () => void;       // функция закрытия (например, закрывает модальное окно)
  onExit?: () => void;        // функция выхода из приложения
  actionType?: ActionType;    // тип действия
  ariaLabel?: string;         // доступность
}