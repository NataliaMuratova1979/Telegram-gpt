
// Импортируем типы данных для типов тем и слов
import { ITopic, IWord } from '../../api/types';

/**
 * Обрабатывает выбор категории: собирает слова из выбранных тем,
 * фильтрует их по длине (если указано),
 * обновляет состояние выбранных данных.
 * 
 * @param data - объект с выбранной категорией и массивом тем
 * @param setSelectedData - функция для обновления выбранных данных в состоянии React
 * @param setWords - функция для обновления списка слов (может быть использована для отображения)
 * @param maxWordLength - максимально допусточная длина слова (опционально)
 * @returns массив所有 слов, объединённый из выбранных тем и фильтрованный по длине
 */
export const handleCategorySelection = (
  data: { category: string; topics: ITopic[] },
  setSelectedData: React.Dispatch<React.SetStateAction<{
    category: string | null;
    topics: ITopic[];
  } | null>>,
  setWords: React.Dispatch<React.SetStateAction<IWord[]>>,
   minWordLength?: number,
   maxWordLength?: number
) => {
  // Логирование выбранной категории и тем для отладки
  console.log('--- Выбрана категория ---');
  console.log('Категория:', data.category);
  console.log('Темы:', data.topics);

  // Обновляем состояние выбранных данных
  setSelectedData(data);
  console.log('Обновленное выбранное данные:', data);

  // Создаём объединённый список всех слов из тем
  // с фильтрацией по длине слова, если указано
  const allWords: IWord[] = data.topics.flatMap(topic =>
    topic.words
      .filter(word => 
        // если maxWordLength задан, фильтруем слова по длине
        maxWordLength ? word.word.length <= maxWordLength : true
      )
      // добавляем к каждому слову информацию о теме, к которой оно относится
      .map(word => ({
        ...word,
        topic: topic.topic,
      }))
  );
  
  // Выводим в консоль список объединённых слов для отладки
  console.log('Объединённые слова из тем:', allWords);
  
  // Выводим каждое слово по порядку
  allWords.forEach((word, index) => {
    console.log(`Слово ${index + 1}:`, word);
  });

  // Возвращаем список всех объединённых и отфильтрованных слов
  return allWords;
};