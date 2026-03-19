import React, { useState, useEffect } from 'react';
import type { IWord } from '../../api/types'; // скорректируйте путь

type TopicChooserProps = {
  words: IWord[];               // Перемешанный массив слов с полем topic
  topics: [string, string];     // Две темы в виде кортежа
};

const TopicChooser: React.FC<TopicChooserProps> = ({ words, topics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);      // Индекс текущего слова
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // Тема выбранной кнопки
  const [buttonState, setButtonState] = useState<'neutral' | 'correct' | 'wrong'>('neutral'); // Статус кнопок (цвет)

  // Текущее слово для показа
  const currentWord = words[currentIndex];

  useEffect(() => {
    console.log(`Переходим к слову с индексом ${currentIndex}:`, currentWord?.word);
    // Сбрасываем состояние кнопок при смене слова
    setSelectedTopic(null);
    setButtonState('neutral');
  }, [currentIndex, currentWord]);

  // Обработка клика по кнопке
  const onTopicClick = (topic: string) => {
    if (buttonState !== 'neutral') {
      console.log('Ожидание задержки, игнорируем клик');
      return; // блокируем повторные клики пока идет задержка
    }

    console.log(`Пользователь выбрал тему "${topic}" для слова "${currentWord.word}" с темой "${currentWord.topic}"`);
    setSelectedTopic(topic);

    if (topic === currentWord.topic) {
      console.log('Выбор правильный');
      setButtonState('correct');
    } else {
      console.log('Выбор неверный');
      setButtonState('wrong');
    }

    // Через 1 секунду переключаем слово
    setTimeout(() => {
      console.log('Переход к следующему слову');
      setCurrentIndex((i) => (i + 1) % words.length); // зацикливаем массив
    }, 1000);
  };

  if (!currentWord) {
    console.log('Список слов пуст или индекс вне диапазона');
    return <div>Список слов пуст</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ fontSize: 24, fontWeight: 'bold' }}>{currentWord.word}</div>

      <div style={{ display: 'flex', gap: 16 }}>
        {topics.map((topicName) => {
          // Вычисляем цвет кнопки
          let bgColor = '#eee';
          if (selectedTopic === topicName) {
            if (buttonState === 'correct') bgColor = '#4caf50'; // зеленый
            else if (buttonState === 'wrong') bgColor = '#f44336'; // красный
          }

          return (
            <button
              key={topicName}
              onClick={() => onTopicClick(topicName)}
              disabled={buttonState !== 'neutral'} // блокировка при ожидании
              style={{
                padding: '12px 24px',
                fontSize: 16,
                fontWeight: 'bold',
                cursor: buttonState === 'neutral' ? 'pointer' : 'default',
                backgroundColor: bgColor,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                minWidth: 120,
                userSelect: 'none',
                transition: 'background-color 0.3s ease',
              }}
            >
              {topicName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicChooser;