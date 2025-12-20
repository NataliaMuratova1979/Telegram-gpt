// mockApi.ts
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
 * @param length - длина слова или пустая строка для любых
 * @param count - кол-во слов
 */
export const getWords = (
  topic: string,
  length: '' | 'короткое' | 'среднее' | 'длинное',
  count: 5 | 10 | 'Много'
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
        filtered = filtered.filter(w => w.length === length);
      }

      // Обработка варианта количества слов
      if (count === 'Много') {
        // вернуть все слова
        resolve([...filtered]);
      } else {
        // случайные слова
        const n = count; // 5 или 10
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        resolve(shuffled.slice(0, n));
      }
    }, 400);
  });