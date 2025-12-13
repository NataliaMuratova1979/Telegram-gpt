import React from 'react';
import styles from './StyledText.module.css';
import { StyledTextProps, TextPurpose } from './types';

const StyledText: React.FC<StyledTextProps> = ({ children, className, style, purpose }) => {
  // Можно задавать разные классы или стили в зависимости от purpose
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

  return (
    <span className={combinedClassName} style={style}>
      {children}
    </span>
  );
};

export default StyledText;