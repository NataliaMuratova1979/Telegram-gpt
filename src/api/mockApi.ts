import mockData from './mockData.json';
import type { ITopic, IWord } from './types';

const data = mockData as ITopic[];

/**
 * Получить список всех тем
 */
export const getTopics = (): Promise<ITopic[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve([...data]), 400);
  });

/**
 * Получить слова по теме и фильтрам
 * @param topic - название темы
 * @param length - длина слова или пустая строка для любых ('', 'короткое', 'среднее', 'длинное')
 * @param count - кол-во слов (5, 10, 'Много')
 */

type LengthLabel = '' | 'короткое' | 'среднее' | 'длинное' | null;
type WordCount = number | 'Много';

export const getWords = (
  topic: string,
  length: LengthLabel,
  count: WordCount
): Promise<IWord[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const topicObj = data.find(t => t.topic === topic);
      if (!topicObj) {
        resolve([]);
        return;
      }

      // Фильтрация по длине
      let filtered = topicObj.words;
      if (length) {
        // используем функцию для определения длины слова
        const lengthRules = {
          "короткое": (w: string) => w.length < 5,
          "среднее": (w: string) => w.length >= 5 && w.length <= 8,
          "длинное": (w: string) => w.length > 8,
        };
        const ruleFn = lengthRules[length];
        filtered = filtered.filter(w => ruleFn(w.word));
      }

      // Обработка варианта количества слов
      if (count === 'Много') {
        resolve([...filtered]);
      } else {
        const n = count; // 5 или 10
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        resolve(shuffled.slice(0, n));
      }
    }, 400);
  });