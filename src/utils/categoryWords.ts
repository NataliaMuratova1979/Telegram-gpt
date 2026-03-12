// src/utils/categoryWords.ts
import type { ICategory } from '../api/types';

export type WordItem = {
  word: string;
  topic: string;
};

export const collectWordsFromCategory = (category: ICategory): string[] => {
  // Предположим, структура: category.topics[].words[].word или строки
  return category.topics.flatMap((t) =>
    t.words.map((w: any) => (typeof w === 'string' ? w : w.word))
  );
};

export const collectAllWordsForActiveCategory = (
  categories: ICategory[],
  activeCategory: string | null
): string[] => {
  if (!activeCategory) return [];
  const cat = categories.find((c) => c.category === activeCategory);
  if (!cat) return [];
  return collectWordsFromCategory(cat);
};