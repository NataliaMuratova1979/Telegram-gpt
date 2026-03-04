import mockData from './mockData.json';
import type { ICategory, ITopic, IWord } from './types';

const data = mockData as ICategory[];

/**
 * Получить список всех категорий
 */
export const getCategories = (): Promise<string[]> =>
  new Promise((resolve, reject) => {
    try {
      console.log('Запрос: получить список всех категорий');
      setTimeout(() => {
        const categories = data.map(c => c.category);
        console.log('Полученные категории:', categories);
        resolve(categories); // Массив строк
      }, 400);
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
      reject(error);
    }
  });

/**
 * Получить список тем по названию категории
 */
export const getTopics = (categoryName: string): Promise<ITopic[]> =>
  new Promise((resolve, reject) => {
    try {
      if (!categoryName) {
        throw new Error('Параметр categoryName обязателен');
      }
      console.log(`Запрос: получить темы для категории "${categoryName}"`);
      setTimeout(() => {
        const category = data.find(c => c.category === categoryName);
        if (category) {
          console.log(`Найдена категория:`, category);
          console.log(`Темы:`, category.topics);
          resolve(category.topics);
        } else {
          const errorMsg = `Категория "${categoryName}" не найдена`;
          console.log(errorMsg);
          reject(new Error(errorMsg));
        }
      }, 400);
    } catch (error) {
      console.error('Ошибка при получении тем:', error);
      reject(error);
    }
  });

/**
 * Получить слова по названию темы
 */
export const getWords = (topicName: string): Promise<IWord[]> =>
  new Promise((resolve, reject) => {
    try {
      if (!topicName) {
        throw new Error('Параметр topicName обязателен');
      }
      console.log(`Запрос: получить слова для темы "${topicName}"`);
      setTimeout(() => {
        let wordsFound: IWord[] = [];
        for (const category of data) {
          const topic = category.topics.find(t => t.topic === topicName);
          if (topic) {
            wordsFound = topic.words;
            console.log(`Найдена тема в категории "${category.category}":`, topic);
            break;
          }
        }
        if (wordsFound.length > 0) {
          console.log(`Слова для темы "${topicName}":`, wordsFound);
          resolve(wordsFound);
        } else {
          const errorMsg = `Тема "${topicName}" не найдена`;
          console.log(errorMsg);
          reject(new Error(errorMsg));
        }
      }, 400);
    } catch (error) {
      console.error('Ошибка при получении слов:', error);
      reject(error);
    }
  });