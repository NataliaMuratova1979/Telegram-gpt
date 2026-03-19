import React, { useState, useEffect } from 'react';
import type { IWord } from '../../../api/types'; // путь подкорректируйте под проект
import { shuffleArray } from '../../../utils/shuffleArray'; // импорт функции из новой папки

type ShuffledWordsListProps = {
  words: IWord[];
};

const ShuffledWordsList: React.FC<ShuffledWordsListProps> = ({ words }) => {
  const [shuffledWords, setShuffledWords] = useState<IWord[]>([]);

  useEffect(() => {
    if (words.length > 0) {
      setShuffledWords(shuffleArray(words));
    } else {
      setShuffledWords([]);
    }
  }, [words]);

  if (shuffledWords.length === 0) return null;

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Слова выбранной категории (перемешанные)</h3>
      <ul>
        {shuffledWords.map((word, idx) => (
          <li key={`${word.word}-${idx}`}>
            {word.word} <em>({word.topic})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShuffledWordsList;