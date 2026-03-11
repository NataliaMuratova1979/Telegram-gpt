import { ITopic, IWord } from '../../api/types';
import { handleCategorySelection } from './handleCategorySelection';
import { shuffleArray } from '../../utils/shuffle';

/**
 * Создает обработчик выбора категории,
 * который обновляет список слов, перемешивает их и обновляет состояние.
 * 
 * @param setSelectedWords - функция для обновления выбранных слов
 * @param setShuffledWords - функция для обновления перемешанных слов
 * @param setCurrentWordIndex - функция для сброса текущего индекса слова (например, к 0)
 * @param maxWordLength - опционально, ограничение максимальной длины слов
 * @param minWordLength - опционально, ограничение минимальной длины слов
 * @param sortOrder - опционально, порядок сортировки: 'asc' или 'desc'
 * @returns обработчик, который вызывается при выборе категории
 */
export const createCategorySelectHandler = (
  setSelectedWords: React.Dispatch<React.SetStateAction<IWord[]>>,
  setShuffledWords: React.Dispatch<React.SetStateAction<IWord[]>>,
  setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>,
  maxWordLength?: number,
  minWordLength?: number,
  sortOrder: 'asc' | 'desc' = 'asc'
) => {
  return (
    data: { category: string; topics: ITopic[] }
  ) => {
    // Получаем слова с учетом длины через handleCategorySelection
    let newWords = handleCategorySelection(data, () => {}, () => {}, minWordLength, maxWordLength);
    
    // Фильтрация и сортировка
    newWords = filterAndSortWordsByLength(newWords, minWordLength || 0, maxWordLength || Infinity, sortOrder);
    
    // Логируем для отладки
    console.log('Обновленные слова после фильтрации и сортировки:', newWords);
    
    // Обновляем выбранные слова
    setSelectedWords(newWords);
    
    // Перемешиваем слова
    const shuffled = shuffleArray(newWords);
    console.log('Порядок после перемешивания:', shuffled.map(word => word.word));
    
    setShuffledWords(shuffled);
    setCurrentWordIndex(0);
  };
};

/**
 * Фильтрует массив `IWord[]` по длине и сортирует по длине.
 *
 * @param words - массив слов типа IWord[]
 * @param minLength - минимальная длина слова, включительно
 * @param maxLength - максимальная длина слова, включительно
 * @param sortOrder - порядок сортировки: 'asc' или 'desc'
 * @returns отсортированный массив IWord[]
 */
function filterAndSortWordsByLength(
  words: IWord[],
  minLength: number,
  maxLength: number,
  sortOrder: 'asc' | 'desc' = 'asc'
): IWord[] {
  const filtered = words.filter(word => word.word.length >= minLength && word.word.length <= maxLength);
  return filtered.sort((a, b) => 
    (sortOrder === 'asc' ? a.word.length - b.word.length : b.word.length - a.word.length)
  );
}