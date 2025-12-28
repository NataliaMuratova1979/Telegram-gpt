// Импорт данных из файла mockData.json
import mockData from './mockData.json';
// Импорт типовых интерфейсов ITopic и IWord для типизации данных
import type { ITopic, IWord } from './types';

// Приведение импортированных данных к типу массива ITopic
const data = mockData as ITopic[];

/**
 * Функция фильтрации слов по длине слова и выбранным меткам
 * @param words - массив слов типа IWord
 * @param selectedLabels - массив выбранных меток длины, например, ['Короткое', 'Среднее']
 * @returns Отфильтрованный массив слов
 */
function filterWordsByLength(words: IWord[], selectedLabels: string[]): IWord[] {
  return words.filter(w => {
    const length = w.word.length; // длина слова
    // Проверка включения по метке "Короткое" и длине < 5
    const includeShort = selectedLabels.includes('Короткое') && length < 5;
    // Проверка включения по метке "Среднее" и длине от 5 до 8
    const includeMedium = selectedLabels.includes('Среднее') && length >= 5 && length <= 8;
    // Проверка включения по метке "Длинное" и длине > 8
    const includeLong = selectedLabels.includes('Длинное') && length > 8;

    // Возвращает true, если слово соответствует любой из выбранных меток
    return includeShort || includeMedium || includeLong;
  });
}

/**
 * Асинхронная функция получения списка всех тем
 * Возвращает промис, который резолвится через 400 мс с копией массива данных
 */
export const getTopics = (): Promise<ITopic[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve([...data]), 400);
  });

/**
 * Типы для фильтрации слов
 * LengthLabel - метки для длины слова
 * WordCount - количество слов ("Немного", "Много", "Все")
 */
export type LengthLabel = 'короткое' | 'среднее' | 'длинное' | null; // метки длины (здесь на русском)
export type WordCount = 'Немного' | 'Много' | 'Все'; // по количеству слов

// Значения по умолчанию для выбранных меток (используются, если пользователь не меняет выбор)
const defaultSelectedLabels: string[] = ['короткое', 'среднее', 'длинное'];

/**
 * Асинхронная функция получения слов по теме и фильтрам
 * @param topic - название темы
 * @param lengthLabels - массив меток длин слова или 'все'
 * @param count - число слов или специальные значения ('Много', 'Все')
 * @returns Promise с массивом слов
 */
export const getWords = (
  topic: string,
  lengthLabels: string[] | 'все', // Через тип можно уточнить, что это либо массив, либо 'все'
  count: WordCount
): Promise<IWord[]> => {
  console.log('Вызов getWords с параметрами:', { topic, lengthLabels, count });
  return new Promise((resolve) => {
    setTimeout(() => {
      // Поиск темы по названию
      const topicObj = data.find((t) => t.topic === topic);
      if (!topicObj) {
        // Если тема не найдена, возвращаем пустой массив
        console.log('Тема не найдена, возвращаю пустой массив');
        resolve([]);
        return;
      }

      // Начинаем с полного массива слов выбранной темы
      let filteredWords = [...topicObj.words];
      console.log('Изначальные слова:', filteredWords);

      // Если метки длины не равны 'все', применяем фильтрацию по длине
      if (lengthLabels !== 'все') {
        filteredWords = filterWordsByLength(filteredWords, lengthLabels);
        console.log('После фильтрации по длине:', filteredWords);
      }

      // Обработка по количеству слов
      if (count === 'Много') {
        // Если 'Много', возвращаем все отфильтрованные слова
        resolve(filteredWords);
      } else {
        // Если указано число (или по умолчанию — 0), выбираем случайные n слов
        const n = typeof count === 'number' ? count : 0;
        // Перемешиваем слова случайным способом
        const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
        console.log(`Выбираю ${n} случайных слова из`, shuffled);
        // Возвращаем первые n слов после перемешивания
        resolve(shuffled.slice(0, n));
      }
    }, 400); // задержка для имитации асинхронной операции
  });
};