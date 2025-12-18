import React, { useState } from 'react';
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
  purpose,
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.SyntheticEvent) => {
    if (disabled) return;

    // Эффект нажатия
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);

    // Вызов переданного обработчика
    if (onClick) {
      if (onClick.length === 0) {
        (onClick as () => void)();
      } else {
        (onClick as (e: React.SyntheticEvent) => void)(e);
      }
    }

    // Обработка действия по purpose
    if (purpose) {
      switch (purpose) {
        case 'open-modal':
          console.log('Открытие модального окна');
          break;
        case 'select-option':
          console.log('Выбор варианта');
          break;
        case 'submit':
          console.log('Отправка формы');
          break;
        case 'cancel':
          console.log('Отмена');
          break;
        case 'custom':
          console.log('Кастомное действие');
          break;
        default:
          break;
      }
    }
  };

  // Формируем базовые классы
  const classes = [
    styles.button,
    styles[`button_type_${type}`],
    styles[`button_size_${size}`],
    styles[`button_variant_${variant}`],
    fullWidth ? styles.fullWidth : '',
    className,
    isCorrect !== undefined ? (isCorrect ? styles['answer-correct'] : styles['answer-incorrect']) : '',
    isPressed ? styles.pressed : '',
    // Если purpose='select-option', добавляем стиль doubleLine
    purpose === 'select-option' ? styles.doubleLine : '',
  ].filter(Boolean).join(' ');

  // Расчёт фона по index (для colorful)
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
    ...(isCorrect !== undefined ? { borderColor: isCorrect ? 'green' : 'red' } : {}),
    ...(fullWidth ? { width: '100%' } : {}),
    ...(fill ? { backgroundColor: fill } : {}),
    ...(stroke ? { borderColor: stroke } : {}),
  };

  // Обработка отображения children
  let displayChildren = children;

  // Если purpose='select-option', делаем текст двухстрочным
  if (purpose === 'select-option' && typeof children === 'string') {
    const words = children.trim().split(/\s+/);
    if (words.length >= 2) {
      displayChildren = (
        <>
          {words[0]}
          <br />
          {words.slice(1).join(' ')}
        </>
      );
    }
  }

  return (
    <button
      type={htmlType}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      style={inlineStyles}
      {...rest}
    >
      {purpose === 'select-option' ? (
        <span className={styles.doubleLine}>{displayChildren}</span>
      ) : (
        children
      )}
    </button>
  );
};