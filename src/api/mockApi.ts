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
 * Типы для фильтрации по длине слова и количеству
 */
export type LengthLabel = 'короткое' | 'среднее' | 'длинное' | null;
export type WordCount = 'Немного' | 'Много' | 'Все';

const defaultSelectedLabels: string[] = ['короткое', 'среднее', 'длинное'];

/**
 * Получить слова по теме и фильтрам
 * @param topic - название темы
 * @param lengthLabels - массив выбранных чекбоксов (меток) или 'все'
 * @param count - кол-во слов (например, 5, 10, 'Много')
 */
export const getWords = (
  topic: string,
  lengthLabels: string[] | 'все',
  count: WordCount
): Promise<IWord[]> => {
  console.log('Вызов getWords с параметрами:', { topic, lengthLabels, count });
  return new Promise((resolve) => {
    setTimeout(() => {
      const topicObj = data.find((t) => t.topic === topic);
      console.log('Нашли тему:', topicObj);
      if (!topicObj) {
        console.log('Тема не найдена, возвращаю пустой массив');
        resolve([]);
        return;
      }
      
      let filteredWords = [...topicObj.words];
      console.log('Изначальные слова:', filteredWords);

      if (lengthLabels !== 'все') {
        const lengthRules: Record<string, (w: string) => boolean> = {
          "короткое": (w: string) => w.length < 5,
          "среднее": (w: string) => w.length >= 5 && w.length <= 8,
          "длинное": (w: string) => w.length > 8,
        };

        console.log('Перед фильтрацией по длине:', [...filteredWords]);

        filteredWords = filteredWords.filter(w =>
          lengthLabels.some(label => {
            const rule = lengthRules[label];
            const lengthMatch = rule(w.word);
            console.log(`Проверка слова "${w.word}" на правило "${label}": ${lengthMatch}`);
            return lengthMatch;
          })
        );

        console.log('После фильтрации по длине:', [...filteredWords]);
      }

      if (count === 'Много') {
        resolve(filteredWords);
      } else {
        const n = typeof count === 'number' ? count : 0;
        const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
        console.log(`Выбираю ${n} случайных слова из`, shuffled);
        resolve(shuffled.slice(0, n));
      }
    }, 400);
  });
};