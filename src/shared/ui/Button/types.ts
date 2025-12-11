import React, { SyntheticEvent, ReactNode } from 'react';

// в Button.types.ts
export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  // специальные типы для вашей задачи
  | 'colorful'
  | 'start'
  | 'answer-correct'
  | 'answer-incorrect';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonHtmlType = 'button' | 'submit' | 'reset';

export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'> {
  type?: ButtonType;
  size?: ButtonSize;
  variant?: 'default' | 'start' | 'answer-correct' | 'answer-incorrect' | 'colorful'; // новые варианты
  onClick?: (() => void) | ((e: React.SyntheticEvent) => void);
  className?: string;
  htmlType?: ButtonHtmlType;
  fullWidth?: boolean;
  fill?: string;
  stroke?: string;
  isCorrect?: boolean; // добавляем свойство
}