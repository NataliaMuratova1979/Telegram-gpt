// src/utils/helpers.ts

import { ITopic, IWord } from '../../api/types';

export const handleCategorySelection = (
  data: { category: string; topics: ITopic[] },
  setSelectedData: React.Dispatch<React.SetStateAction<{
    category: string | null;
    topics: ITopic[];
  } | null>>,
  setWords: React.Dispatch<React.SetStateAction<IWord[]>>
) => {
  console.log('--- Выбрана категория ---');
  console.log('Категория:', data.category);
  console.log('Темы:', data.topics);

  // Обновляем выбранные данные
  setSelectedData(data);
  console.log('Обновленное выбранное данные:', data);

  // Объединение слов из тем: добавим тему к каждому слову
  const allWords: IWord[] = data.topics.flatMap(topic =>
    topic.words.map(word => ({
      ...word,
      topic: topic.topic, // добавляем поле topic к слову
    }))
  );
  
  // Выводим в консоль
  console.log('Объединённые слова из тем:', allWords);
  allWords.forEach((word, index) => {
    console.log(`Слово ${index + 1}:`, word);
  });

  // Возвращаем обработанные слова
  return allWords;
};