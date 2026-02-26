'use client';

import React, { useState } from 'react';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  size = 'medium',
  variant = 'default',
  style,
  htmlType = 'button',
  purpose,
  index,
  ...rest
}) =>  {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (disabled) return;

  setIsPressed(true);
  setTimeout(() => setIsPressed(false), 200);

  if (onClick) {
    onClick(e);
  }
}

  // Убираем все классы, стили только через prop style и rest props

  return (
    <button
      type={htmlType}
      onClick={handleClick}
      disabled={disabled}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};