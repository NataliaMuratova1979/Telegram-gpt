// src/components/WordCarousel.tsx
'use client';

import React from 'react';
import type { IWord } from '../../api/types';

type WordCarouselProps = {
  words: IWord[];
  currentIndex: number; // индекс текущего слова
  onNext: () => void;     // функция для переключения слова
  className?: string;
};

const WordCarousel: React.FC<WordCarouselProps> = ({
  words,
  currentIndex,
  onNext,
  className,
}) => {
  if (words.length === 0) return null;
  const item = words[currentIndex];

  return (
    <div
      className={className}
      style={{
        minWidth: 180,
        padding: 12,
        border: '1px solid #ccc',
        borderRadius: 6,
        textAlign: 'center',
        cursor: 'pointer', // клик по карточке
      }}
      onClick={onNext} // переключение при клике
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