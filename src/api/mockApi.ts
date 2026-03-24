// api/mockApi.ts
import mockData from './mockData.json';
import type { ICategory, ITopic, IWord } from './types';

const data = mockData as ICategory[];

/**
 * Получить список всех категорий (с темами и словами)
 * Возвращаем массив объектов ICategory[]
 */
export const getCategories = (): Promise<ICategory[]> =>
  new Promise((resolve, reject) => {
    try {
      console.log('Запрос: получить список всех категорий');
      setTimeout(() => {
        // data уже имеет тип ICategory[]
        const categories = data.map(c => c.category);
        console.log('Полученные категории:', categories);
        resolve(data); // возвращает ICategory[]
      }, 400); // задержка 400 мс
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
      reject(error);
    }
  });