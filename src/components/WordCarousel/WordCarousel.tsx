// src/components/WordCarousel.tsx
import React, { useEffect, useState } from 'react';
import type { WordItem } from '../../utils/categoryWords'; // новый экспорт типа

type WordCarouselProps = {
  words: WordItem[];
  interval?: number; // мс между сменами слов
  className?: string;
};

export const WordCarousel: React.FC<WordCarouselProps> = ({
  words,
  interval = 1500,
  className,
}) => {
  const [index, setIndex] = useState(0);

  // сброс индекса при изменении слов
  useEffect(() => {
    setIndex(0);
  }, [words]);

  // авто смена слов
  useEffect(() => {
    if (words.length === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  if (words.length === 0) return null;

  const item = words[index];

  return (
    <div
      className={className}
      style={{
        minWidth: 180,
        padding: 12,
        border: '1px solid #ccc',
        borderRadius: 6,
        textAlign: 'center',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>
        Слово
        <span
          style={{
            marginLeft: 6,
            padding: '2px 6px',
            borderRadius: 999,
            background: '#eee',
            fontSize: 12,
          }}
        >
          {item?.topic}
        </span>
      </div>
      <div style={{ fontSize: 18 }}>{item?.word}</div>
    </div>
  );
};

export default WordCarousel;