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
  count: number
): Promise<IWord[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const topicObj = data.find(t => t.topic === topic);
      if (!topicObj) {
        resolve([]);
        return;
      }
      let filtered = topicObj.words;
      if (length) {
        filtered = filtered.filter(w => w.length === length);
      }
      if (count > 0 && count < filtered.length) {
        filtered = filtered.slice(0, count);
      }
      resolve([...filtered]);
    }, 400);
  });