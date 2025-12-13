import React, { useState, SyntheticEvent } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps & { index?: number }> = ({
  index,
  onClick,
  className = '',
  children,
  disabled = false,
  type = 'primary',
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
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: SyntheticEvent) => {
    if (disabled) return;

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200); // через 200мс эффект исчезнет

    // Логика обработки клика
    if (onClick) {
      if (onClick.length === 0) {
        (onClick as () => void)();
      } else {
        (onClick as (e: SyntheticEvent) => void)(e);
      }
    }
  };

  const classes = [
    styles.button,
    type === 'colorful' ? styles.button_colorful : styles[`button_type_${type}`],
    styles[`button_size_${size}`],
    styles[`button_variant_${variant}`],
    styles[`button_type_${type}`],
    disabled ? styles.button_disabled : '',
    className,
    isPressed ? styles.pressed : '', // добавляйте класс при нажатии
  ].filter(Boolean).join(' ');

  const backgroundColor: string | undefined = (() => {
    if (type === 'colorful' && typeof index === 'number') {
      const colors = [
        'var(--tag-color-pale-1)',
        'var(--tag-color-pale-2)',
        'var(--tag-color-pale-3)',
        'var(--tag-color-pale-4)',
        'var(--tag-color-pale-5)',
      ];
      return colors[index % colors.length];
    }
    return color;
  })();

  const inlineStyles: React.CSSProperties = {
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(isCorrect !== undefined
      ? { borderColor: isCorrect ? 'green' : 'red' }
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