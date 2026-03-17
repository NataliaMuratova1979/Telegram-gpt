import type { ICategory, IWord } from '../api/types';

export const collectWordsFromCategory = (category: ICategory): IWord[] => {
  // Структура: category.topics[].words[].word или строки, предполагается, что возвращаем IWord[]
  return category.topics.flatMap((t) =>
    t.words.map((w: IWord) => ({ ...w })) // возвращаем копию IWord, чтобы тип соответствовал
  );
};

export const collectAllWordsForActiveCategory = (
  categories: ICategory[],
  activeCategory: string | null
): IWord[] => {
  if (!activeCategory) return [];
  const cat = categories.find((c) => c.category === activeCategory);
  if (!cat) return [];
  return collectWordsFromCategory(cat);
};