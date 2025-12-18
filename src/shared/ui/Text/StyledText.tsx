import React from 'react';
import styles from './StyledText.module.css';
import { StyledTextProps, TextPurpose } from './types';

const StyledText: React.FC<StyledTextProps> = ({ children, className, style, purpose }) => {
  let purposeClass = '';

  switch (purpose) {
    case 'button':
      purposeClass = styles.button;
      break;
    case 'link':
      purposeClass = styles.link;
      break;
    case 'checkbox':
      purposeClass = styles.checkbox;
      break;
    default:
      purposeClass = '';
  }

  const combinedClassName = [purposeClass, className].filter(Boolean).join(' ');

  // Если purpose='button' и children — это строка, разбиваем на две строки
  let displayedChildren = children;

  if (purpose === 'button' && typeof children === 'string') {
    const words = children.trim().split(/\s+/); // разбиваем по пробелам
    if (words.length === 2) {
      // объединяем с разрывом строки, чтобы отображались в две строки
      displayedChildren = (
        <>
          {words[0]}
          <br />
          {words[1]}
        </>
      );
    }
  }

  return (
    <span className={combinedClassName} style={style}>
      {displayedChildren}
    </span>
  );
};

export default StyledText;