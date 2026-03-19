// src/hooks/useCategoryWords.ts
import React from 'react';
import { ICategory, IWord } from '../api/types';

function shuffleArray<T>(array: T[]): T[] {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const useCategoryWords = (
  categories: ICategory[],
  activeCategory: string | null
): IWord[] => {
  return React.useMemo(() => {
    if (!activeCategory) return [];

    const category = categories.find(c => c.category === activeCategory);
    if (!category) return [];

    const words: IWord[] = [];

    category.topics.forEach(topic => {
      topic.words.forEach(w => {
        const wordStr = typeof w === 'string' ? w : w.word;
        words.push({ word: wordStr, topic: topic.topic });
      });
    });

    return shuffleArray(words);
  }, [categories, activeCategory]);
};