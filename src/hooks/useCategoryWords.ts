// src/hooks/useCategoryWords.ts
import { ICategory, IWord } from '../api/types';

export const useCategoryWords = (
  categories: ICategory[],
  activeCategory: string | null
): IWord[] => {
  if (!activeCategory) return [];

  // Находим категорию
  const category = categories.find(c => c.category === activeCategory);
  if (!category) return [];

  // Формируем список всех слов с темой
  const words: IWord[] = [];

  category.topics.forEach(topic => {
    topic.words.forEach(w => {
      // w может быть строкой или объектом с word
      const wordStr = typeof w === 'string' ? w : w.word;
      words.push({ word: wordStr, topic: topic.topic });
    });
  });

  return words;
};