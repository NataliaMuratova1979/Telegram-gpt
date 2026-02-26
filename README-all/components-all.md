Универсальная кнопка

// src/components/AnswerButton.jsx
import React from 'react';

function AnswerButton({ label, onClick, isCorrect }) {
  const handleClick = () => {
    onClick(isCorrect);
  };

  return (
    <button onClick={handleClick} style={{ margin: '5px', padding: '10px 20px' }}>
      {label}
    </button>
  );
}

export default AnswerButton;


 Сделаем универсальное модальное окно с двумя кнопками. Каждая кнопка — это тема, и при нажатии:

Если выбранная тема совпадает с темой слова — показываем "правильно" и кнопка зеленая.
Если не совпадает — показываем "неправильно" и кнопка красная.

// src/components/TemaButton.jsx
import React from 'react';

function TemaButton({ label, isSelected, isCorrect, onClick }) {
  // Определяем цвет по состоянию:
  let backgroundColor = 'lightgray'; // по умолчанию
  if (isSelected) {
    backgroundColor = isCorrect ? 'lightgreen' : 'salmon'; // зеленый или красный
  }

  return (
    <button
      onClick={onClick}
      style={{
        margin: '5px',
        padding: '10px 20px',
        backgroundColor,
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

export default TemaButton;

2. Основной компонент модального окна

// src/components/ModalWithThemes.jsx
import React, { useState } from 'react';
import TemaButton from './TemaButton';

function ModalWithThemes() {
  const word = 'React'; // например, слово
  const topic = 'Библиотека'; // правильная тема для слова

  const themes = ['Библиотека', 'Фреймворк'];

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [result, setResult] = useState('');

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme);
    if (theme === topic) {
      setResult('Правильно!');
    } else {
      setResult('Неправильно!');
    }
  };

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
    >
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <h3>Выберите тему для слова "{word}"</h3>
        <div style={{ marginBottom: '10px' }}>
          {themes.map((theme) => (
            <TemaButton
              key={theme}
              label={theme}
              onClick={() => handleThemeClick(theme)}
              isSelected={selectedTheme === theme}
              isCorrect={theme === topic}
            />
          ))}
        </div>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
}

export default ModalWithThemes;

Что в этом подходе:
Есть список тем themes.
При клике кнопки — она "выбирается" и окрашивается:
Зеленый, если совпадает с правильной темой.
Красный — если не совпадает.
Также выводится сообщение "Правильно!" или "Неправильно!".