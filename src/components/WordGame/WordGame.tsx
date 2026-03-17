import React, { useContext, useEffect } from 'react';
import GameContext from '../../context/GameContext';
import TopicButton from '../TopicButton'; // предполагаемый компонент для кнопки темы
import { shuffleArray } from '../../utils/shuffleArray';
import { IWord } from '../../api/types';

type WordGameProps = {
  topic1: string;
  topic2: string;
};

const WordGame: React.FC<WordGameProps> = ({ topic1, topic2 }) => {
  const ctx = useContext(GameContext);
  if (!ctx) return null;

  const { state, dispatch } = ctx;
  const words = state.categoryWords; // без приведения типов
  const currentIndex = state.currentWordIndex ?? 0;
  const answeredWords: { index: number; correct: boolean }[] = state.answeredWords ?? [];

  const currentWord = words[currentIndex];

  // Перемешиваем слова при первой загрузке или изменении массива
useEffect(() => {
  if (words.length > 0) {
    const shuffled = shuffleArray(words);
    dispatch({ type: 'SET_CATEGORY_WORDS', payload: shuffled });
    dispatch({ type: 'SET_CURRENT_WORD_INDEX', payload: 0 });
    dispatch({ type: 'SET_ANSWERED_WORDS', payload: [] });
  }
}, [topic1, topic2]);

  if (!words || words.length === 0 || !currentWord) return null;

  const handleNextWord = () => {
    const nextIndex = (currentIndex + 1) % words.length;
    dispatch({ type: 'SET_CURRENT_WORD_INDEX', payload: nextIndex });
  };

  const handleChoice = (topic: string) => {
    const isCorrect = topic === currentWord.topic;
    dispatch({ type: 'ADD_ANSWER', payload: { index: currentIndex, correct: isCorrect } });
    // Обновляем список answeredWords
    dispatch({ type: 'SET_ANSWERED_WORDS', payload: [...answeredWords, { index: currentIndex, correct: isCorrect }] });
    setTimeout(() => {
      handleNextWord();
    }, 1000);
  };

  const getButtonColor = (topic: string): 'green' | 'red' | undefined => {
    const answer = answeredWords.find(w => w.index === currentIndex);
    if (!answer) return undefined;
    if (answer.correct && topic === currentWord.topic) return 'green';
    if (!answer.correct && topic !== currentWord.topic) return undefined;
    if (answer.correct && topic !== currentWord.topic) return 'red';
    return undefined;
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      {/* Кнопки выбора темы */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
        <TopicButton
          topic={topic1}
          onSelect={() => handleChoice(topic1)}
          style={{
            backgroundColor:
              getButtonColor(topic1) === 'green' ? 'lightgreen' :
              getButtonColor(topic1) === 'red' ? 'salmon' : undefined,
          }}
        />
        <TopicButton
          topic={topic2}
          onSelect={() => handleChoice(topic2)}
          style={{
            backgroundColor:
              getButtonColor(topic2) === 'green' ? 'lightgreen' :
              getButtonColor(topic2) === 'red' ? 'salmon' : undefined,
          }}
        />
      </div>
      {/* Текущее слово */}
      <div style={{ marginBottom: 12, fontSize: 24, fontWeight: 'bold' }}>
        {currentWord.word}
      </div>
    </div>
  );
};

export default WordGame;