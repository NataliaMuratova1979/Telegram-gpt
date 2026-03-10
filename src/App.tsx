import React, { useState, useEffect } from 'react'; // Импорт React и хуков
import './app/styles/index.css'; // Стиль
import { CloseButton } from './shared/ui/CloseButton'; // Кнопка закрытия
import { CategoryButtons } from './components/CategoryButtons'; // Компонент кнопок
import { IWord, ITopic } from './api/types'; // Типы для слов и тем

import { handleCategorySelection } from './shared/handlers/handleCategorySelection'; // Основная функция выбора категории
import { createCategorySelectHandler } from './shared/handlers/handleCategorySelectionHandler'; // Обертка
import { shuffleArray } from './utils/shuffle'; // Функция перемешивания

// Основной компонент
export const App: React.FC = () => {
  const [words, setWords] = useState<IWord[]>([]); 
  const [selectedData, setSelectedData] = useState<{ category: string | null; topics: ITopic[] } | null>(null);
  const [selectedWords, setSelectedWords] = useState<IWord[]>([]); 
  const [shuffledWords, setShuffledWords] = useState<IWord[]>([]); 
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // При первой загрузке
  useEffect(() => {
    console.log('При загрузке компонента, selectedWords:', selectedWords);
    setSelectedWords([]);
  }, []);

  // Создаём обработчик выбора категории через "обертку"
  const handleCategorySelect = createCategorySelectHandler(
    setSelectedWords,
    setShuffledWords,
    setCurrentWordIndex,
    /* maxWordLength= */ undefined
  );

  // Переход к следующему слову
  const showNextWord = () => {
    if (shuffledWords.length === 0) return;
    setCurrentWordIndex(prev => {
      const newIndex = (prev + 1) % shuffledWords.length;
      console.log('Перед сменой слова, shuffledWords:', shuffledWords);
      console.log('Индекс текущего слова:', newIndex);
      return newIndex;
    });
  };

  const currentWord = shuffledWords.length > 0 ? shuffledWords[currentWordIndex] : null;

  return (
    <div style={{ padding: 20 }}>
      <h4>Выберите категорию</h4>
      {/* Передаем новую функцию-обертку */}
      <CategoryButtons onCategorySelect={handleCategorySelect} />

      {currentWord ? (
        (() => {
          console.log('Показанное слово:', currentWord.word);
          console.log('Тема:', currentWord.topic);
          return (
            <div style={{ marginBottom: '20px' }}>
              <h4>Текущее слово:</h4>
              <p>
                <strong>{currentWord.word}</strong>
              </p>
              <button onClick={showNextWord}>Следующее слово</button>
            </div>
          );
        })()
      ) : (
        <p>Выберите категорию и дождитесь слов.</p>
      )}

      <h4>Общие слова из выбранных тем:</h4>
      <ul>
        {selectedWords.map((word, index) => (
          <li key={index}>
            <strong>{word.word}</strong> — тема: {word.topic}
          </li>
        ))}
      </ul>

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