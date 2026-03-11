import React, { useState, useEffect } from 'react';
import './app/styles/index.css';
import { CloseButton } from './shared/ui/CloseButton';
import { CategoryButtons } from './components/CategoryButtons';
import { IWord, ITopic } from './api/types';

import { handleCategorySelection } from './shared/handlers/handleCategorySelection';
import { createCategorySelectHandler } from './shared/handlers/handleCategorySelectionHandler';
import { shuffleArray } from './utils/shuffle';

import { WordLengthFilter } from './components/WordLengthFilter/WordLengthFilter'; // импорт компонента

export const App: React.FC = () => {
  const [words, setWords] = useState<IWord[]>([]);
  const [selectedData, setSelectedData] = useState<{ category: string | null; topics: ITopic[] } | null>(null);
  const [selectedWords, setSelectedWords] = useState<IWord[]>([]);
  const [shuffledWords, setShuffledWords] = useState<IWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // состояния для длины слов
  const [minLength, setMinLength] = useState<number>(1);
  const [maxLength, setMaxLength] = useState<number>(10);

  // Обработчики для длины слов
  const handleMinLengthChange = (value: number) => {
    setMinLength(value);
  };

  const handleMaxLengthChange = (value: number) => {
    setMaxLength(value);
  };

  // Создаем обработчик выбора категории с учетом длины слов
  const [handleCategorySelect, setHandleCategorySelect] = useState(() => () =>
    createCategorySelectHandler(
      setSelectedWords,
      setShuffledWords,
      setCurrentWordIndex,
      maxLength,
      minLength
    )
  );

  // Обновляем обработчик при изменении длины
  useEffect(() => {
    setHandleCategorySelect(() =>
      createCategorySelectHandler(
        setSelectedWords,
        setShuffledWords,
        setCurrentWordIndex,
        maxLength,
        minLength
      )
    );
  }, [minLength, maxLength]);

  // Функция для перехода к следующему слову
  const showNextWord = () => {
    if (shuffledWords.length === 0) return;
    setCurrentWordIndex(prev => {
      const newIndex = (prev + 1) % shuffledWords.length;
      return newIndex;
    });
  };

  const currentWord = shuffledWords.length > 0 ? shuffledWords[currentWordIndex] : null;

  return (
    <div style={{ padding: 20 }}>
      <h4>Выберите категорию</h4>
      
      {/* Компонент для выбора диапазона длин */}
      <WordLengthFilter
        minLength={minLength}
        maxLength={maxLength}
        onMinLengthChange={handleMinLengthChange}
        onMaxLengthChange={handleMaxLengthChange}
      />

      {/* Компонент для выбора категории */}
      <CategoryButtons onCategorySelect={handleCategorySelect} />

      {currentWord ? (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h4>Текущее слово:</h4>
            <p>
              <strong>{currentWord.word}</strong>
            </p>
            <button onClick={showNextWord}>Следующее слово</button>
          </div>
        </>
      ) : (
        <p>Выберите категорию и дождитесь слов.</p>
      )}

      {/* Список выбранных слов */}
      <h4>Общие слова из выбранных тем:</h4>
      <ul>
        {selectedWords.map((word, index) => (
          <li key={index}>
            <strong>{word.word}</strong> — тема: {word.topic}
          </li>
        ))}
      </ul>

      {/* Кнопка закрытия */}
      <div style={{ marginBottom: '20px' }}>
        <h3>CloseButton (Закрытие)</h3>
        <CloseButton
          actionType="close"
          onClose={() => console.log('Закрытие модалки')}
        />
      </div>
    </div>
  );
};