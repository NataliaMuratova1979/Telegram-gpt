import React, { useState, useEffect } from 'react';
import './app/styles/index.css';
import { CloseButton } from './shared/ui/CloseButton';
import CategoryButtons from './api/mockExample';
import { IWord, ITopic } from './api/types';

export const App: React.FC = () => {
  const [words, setWords] = useState<IWord[]>([]); // слова для отображения
  
  // Для хранения данных выбранных категорий и тем
  const [selectedData, setSelectedData] = useState<{
    category: string | null;
    topics: ITopic[];
  } | null>(null);

   // Обработка выбора категории и объединение слов с темой
  const handleCategorySelection = (data: { category: string; topics: ITopic[] }) => {
    console.log('--- Выбрана категория ---');
    console.log('Категория:', data.category);
    console.log('Темы:', data.topics);

    setSelectedData(data);
    console.log('Обновленное выбранное данные:', data);

    // Объединение слов из тем: добавим тему к каждому слову
    const allWords: IWord[] = data.topics.flatMap(topic =>
      topic.words.map(word => ({
        ...word,
        topic: topic.topic, // добавляем поле topic к слову
      }))
    );
    setWords(allWords);
    console.log('Объединённые слова из тем:', allWords);

    console.log('Все слова из выбранной категории:');
    allWords.forEach((word, index) => {
      console.log(`Слово ${index + 1}:`, word);
    });
  };


   // useEffect для логирования слов
  useEffect(() => {
    if (words.length > 0) {
      console.log('Отображены слова:', words);
    }
  }, [words]);

  return (
    <div style={{ padding: 20 }}>
      {/* Категории */}
      <div style={{ marginBottom: '20px' }}>
        <h4>CategoryButtons, mockExample</h4>
        <CategoryButtons onCategorySelect={handleCategorySelection} />
        {/* Общие слова из выбранных тем */}
        <div>
          <h4>Общие слова из выбранных тем:</h4>
          <ul>
            {words.map((word, index) => (
              <li key={index}>
                <strong>{word.word}</strong> — тема: {word.topic}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Close button */}
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