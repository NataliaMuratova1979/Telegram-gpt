import React, { SyntheticEvent } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps & { index?: number }> = ({
  index,
  onClick,
  className = '',
  children,
  disabled = false,
  type = 'primary', // default тип
  size = 'medium',
  variant = 'default',
  color,
  isCorrect,
  fullWidth,
  fill,
  stroke,
  htmlType = 'button',
  ...rest
}) => {
  const handleClick = (e: SyntheticEvent) => {
    if (disabled) return;
    if (onClick) {
      if (onClick.length === 0) {
        (onClick as () => void)();
      } else {
        (onClick as (e: SyntheticEvent) => void)(e);
      }
    }
  };

  // Определяем цвет фона для "цветных" кнопок
  let backgroundColor: string | undefined = color;

  if (type === 'colorful') {
    const colors = [
      'var(--tag-color-pale-1)',
      'var(--tag-color-pale-2)',
      'var(--tag-color-pale-3)',
      'var(--tag-color-pale-4)',
      'var(--tag-color-pale-5)',
    ];
    if (typeof index === 'number') {
      backgroundColor = colors[index % colors.length];
    }
  }

const classes = [
  styles.button,
  type === 'colorful' ? styles.button_colorful : styles[`button_type_${type}`],
  styles[`button_size_${size}`],
  styles[`button_variant_${variant}`],
  styles[`button_type_${type}`], // при type='colorful' — должно решить
  disabled ? styles.button_disabled : '',
  className,
].filter(Boolean).join(' ');

  // inline-стили
  const inlineStyles: React.CSSProperties = {
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(isCorrect !== undefined
      ? { borderColor: isCorrect ? 'green' : 'red', boxShadow: '0 0 10px currentColor' }
      : {}),
    ...(fullWidth ? { width: '100%' } : {}),
    ...(fill ? { backgroundColor: fill } : {}),
    ...(stroke ? { borderColor: stroke } : {}),
  };

  return (
    <button
      type={htmlType}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      style={inlineStyles}
      {...rest}
    >
      {children}
    </button>
  );
};