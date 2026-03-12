// src/hooks/useCategoryWords.ts
import { useEffect, useState } from 'react';
import type { ICategory } from '../api/types';
import { collectAllWordsForActiveCategory } from '../utils/categoryWords';

export const useCategoryWords = (
  categories: ICategory[],
  activeCategory: string | null
): string[] => {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const result = collectAllWordsForActiveCategory(categories, activeCategory);
    setWords(result);
    console.log('Слова для категории', activeCategory, '(', activeCategory, '):', result);
  }, [categories, activeCategory]);

  return words;
};

// Можно оставить и дефолтный экспорт, если удобнее
export default useCategoryWords;