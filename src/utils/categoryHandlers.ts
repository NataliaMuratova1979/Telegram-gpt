import { ITopic, IWord } from '../api/types';

export const handleCategorySelection = (
  setSelectedData: React.Dispatch<React.SetStateAction<{ category: string; topics: ITopic[] } | null>>,
  setWords: React.Dispatch<React.SetStateAction<IWord[]>>,
) => (data: { category: string; topics: ITopic[] }) => {
  console.log('--- Выбрана категория ---');
  console.log('Категория:', data.category);
  console.log('Темы:', data.topics);

  setSelectedData(data);
  console.log('Обновленное выбранное данные:', data);

  const allWords: IWord[] = data.topics.flatMap(topic => topic.words);
  setWords(allWords);
  console.log('Объединённые слова из тем:', allWords);
};