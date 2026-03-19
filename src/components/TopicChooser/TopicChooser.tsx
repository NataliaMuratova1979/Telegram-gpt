import React, { useState, useEffect, useRef } from 'react';
import TopicButton from '../TopicButton';
import type { IWord } from '../../api/types';

type TopicChooserProps = {
  words: IWord[];
  topics: [string, string];
};

function shuffleArray<T>(array: T[]): T[] {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const TopicChooser: React.FC<TopicChooserProps> = ({ words, topics }) => {
  const [shuffledWords, setShuffledWords] = useState<IWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [buttonState, setButtonState] = useState<'neutral' | 'correct' | 'wrong'>('neutral');
  const [wordVisible, setWordVisible] = useState(true);

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const resetHighlightTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextWordTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Перемешиваем слова при монтировании и при изменении words
  useEffect(() => {
    const shuffled = shuffleArray(words);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
  }, [words]);

  const currentWord = shuffledWords[currentIndex];

  useEffect(() => {
    setWordVisible(true);
  }, [currentIndex, shuffledWords]);

  useEffect(() => {
    return () => {
      if (resetHighlightTimeout.current) clearTimeout(resetHighlightTimeout.current);
      if (nextWordTimeout.current) clearTimeout(nextWordTimeout.current);
    };
  }, []);

  const onTopicClick = (topic: string) => {
    if (buttonState !== 'neutral') return;

    setSelectedTopic(topic);

    if (currentWord && topic === currentWord.topic) {
      setButtonState('correct');
      setCorrectCount((c) => c + 1);
    } else {
      setButtonState('wrong');
      setWrongCount((w) => w + 1);
    }

    resetHighlightTimeout.current = setTimeout(() => {
      setButtonState('neutral');
      setSelectedTopic(null);
      setWordVisible(false);
    }, 1100);

    nextWordTimeout.current = setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % shuffledWords.length);
      setWordVisible(true);
    }, 2500);
  };

  if (!currentWord) return <div>Список слов пуст</div>;

  const getButtonColor = (topicName: string) => {
    if (selectedTopic !== topicName) return '#eee';
    if (buttonState === 'correct') return '#4caf50';
    if (buttonState === 'wrong') return '#f44336';
    return '#eee';
  };

  // ... ваш существующий код

return (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      minHeight: 220,
      justifyContent: 'center',
    }}
  >
    <div style={{ fontSize: 18 }}>
      Правильных: <b>{correctCount}</b> — Неправильных: <b>{wrongCount}</b>
    </div>

    <TopicButton
      topic={topics[0]}
      onSelect={onTopicClick}
      disabled={buttonState !== 'neutral' || !wordVisible}  // изменено here
      style={{ backgroundColor: getButtonColor(topics[0]) }}
    />

    <div
      style={{
        fontSize: 24,
        fontWeight: 'bold',
        height: 32,
        marginTop: 12,
        marginBottom: 12,
        visibility: wordVisible ? 'visible' : 'hidden',
        opacity: wordVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        userSelect: 'none',
      }}
    >
      {currentWord.word}
    </div>

    <TopicButton
      topic={topics[1]}
      onSelect={onTopicClick}
      disabled={buttonState !== 'neutral' || !wordVisible}  // изменено here
      style={{ backgroundColor: getButtonColor(topics[1]) }}
    />
  </div>
);
};

export default TopicChooser;