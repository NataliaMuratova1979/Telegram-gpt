/**
 * Фильтрует слова массива по длине, оставляя только те, что внутри указанных границ.
 * Также сортирует их по возрастанию длины.
 *
 * @param words - массив слов (строк)
 * @param minLength - минимальная длина слова (включительно)
 * @param maxLength - максимальная длина слова (включительно)
 * @returns отсортированный по длине массив слов
 */
// Обновленная функция сортировки и фильтрации для IWord[]
import { ITopic, IWord } from '../api/types';

function filterAndSortWordsByLength(
  words: IWord[],
  minLength: number,
  maxLength: number,
  sortOrder: 'asc' | 'desc' = 'asc'
): IWord[] {
  const filtered = words.filter(word => word.word.length >= minLength && word.word.length <= maxLength);
  return filtered.sort((a, b) => 
    (sortOrder === 'asc' ? a.word.length - b.word.length : b.word.length - a.word.length)
  );
}