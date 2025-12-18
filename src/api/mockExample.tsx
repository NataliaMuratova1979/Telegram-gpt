import React from 'react';
import { getTopics } from './mockApi';

function ButtonThemes() {
  const handleClick = () => {
    getTopics().then((topics) => {
      console.log('Темы:', topics);
    });
  };

  return (
    <button onClick={handleClick} >Показать темы</button>
  );
}

export default ButtonThemes;