import React, { useState } from 'react';
import './app/styles/index.css';
import { CloseButton } from './shared/ui/CloseButton';
import { CategoryButtons } from './components/CategoryButtons';
import { IWord, ITopic } from './api/types';

import { handleCategorySelection } from './shared/handlers/handleCategorySelection';

export const App: React.FC = () => {
  const [words, setWords] = useState<IWord[]>([]); // все слова
  const [selectedData, setSelectedData] = useState<{
    category: string | null;
    topics: ITopic[];
  } | null>(null);

  const [selectedWords, setSelectedWords] = useState<IWord[]>([]); // выбранные слова
  const [shuffledWords, setShuffledWords] = useState<IWord[]>([]); // случайный порядок слов
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // индекс текущего слова

  // Обработка выбора категории
  const handleCategorySelectionWrapper = (data: { category: string; topics: ITopic[] }) => {
    const newWords = handleCategorySelection(data, () => {}, () => {});
    setSelectedWords(newWords);
    // Перемешиваем все слова при выборе категории
    const shuffled = shuffleArray(newWords);
    setShuffledWords(shuffled);
    setCurrentWordIndex(0); // начинаем с первого слова
  };

  // Функция для показа следующего слова
  const showNextWord = () => {
    if (shuffledWords.length === 0) return;
    setCurrentWordIndex(prev => (prev + 1) % shuffledWords.length);
  };

  // Текущее слово
  const currentWord = shuffledWords.length > 0 ? shuffledWords[currentWordIndex] : null;

  return (
    <div style={{ padding: 20 }}>
      <h4>Выберите категорию</h4>
      <CategoryButtons onCategorySelect={handleCategorySelectionWrapper} />

      {/* Отображение текущего слова */}
      {currentWord ? (
        <div style={{ marginBottom: '20px' }}>
          <h4>Текущее слово:</h4>
          <p>
            <strong>{currentWord.word}</strong> — тема: {currentWord.topic}
          </p>
          <button onClick={showNextWord}>Следующее слово</button>
        </div>
      ) : (
        <p>Выберите категорию и дождитесь слов.</p>
      )}

      {/* Все выбранные слова */}
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

/**
 * Функция перетасовки массива с использованием алгоритма Фишера-Йейтса
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]; // создаем копию, чтобы не мутировать исходник
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}