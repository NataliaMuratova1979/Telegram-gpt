import mockData from './mockData.json';
import type { ITopic, IWord } from './types';

const data = mockData as ITopic[];

// Вставьте эту функцию где-то в начале файла или внутри модуля
function filterWordsByLength(words: IWord[], selectedLabels: string[]): IWord[] {
  return words.filter(w => {
    const length = w.word.length;
    const includeShort = selectedLabels.includes('Короткое') && length < 5;
    const includeMedium = selectedLabels.includes('Среднее') && length >= 5 && length <= 8;
    const includeLong = selectedLabels.includes('Длинное') && length > 8;

    return includeShort || includeMedium || includeLong;
  });
}

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
      if (!topicObj) {
        console.log('Тема не найдена, возвращаю пустой массив');
        resolve([]);
        return;
      }

      let filteredWords = [...topicObj.words];
      console.log('Изначальные слова:', filteredWords);

      // Интеграция фильтрации по длине через функцию
      if (lengthLabels !== 'все') {
        filteredWords = filterWordsByLength(filteredWords, lengthLabels);
        console.log('После фильтрации по длине:', filteredWords);
      }

      // Обработка по количеству
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