import { getCategories } from './mockApi'; // укажите правильный путь

// вызываем функцию и выводим результат
getCategories()
  .then((categories) => {
    console.log('Список категорий:', categories);
  })
  .catch((error) => {
    console.error('Ошибка при получении категорий:', error);
  });