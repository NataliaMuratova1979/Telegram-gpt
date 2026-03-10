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
 * @returns обработчик, который вызывается при выборе категории
 */
export const createCategorySelectHandler = (
  setSelectedWords: React.Dispatch<React.SetStateAction<IWord[]>>,
  setShuffledWords: React.Dispatch<React.SetStateAction<IWord[]>>,
  setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>,
  maxWordLength?: number,
  minWordLength?: number
) => {
  return (
    data: { category: string; topics: ITopic[] }
  ) => {
    // Получаем слова с учетом длины через handleCategorySelection
    const newWords = handleCategorySelection(data, () => {}, () => {}, minWordLength, maxWordLength);

    // Логируем для отладки
    console.log('Обновленные слова после фильтрации и выбора категории:', newWords);

    // Обновляем выбранные слова
    setSelectedWords(newWords);

    // Опционально: можно дополнительно перемешать или обработать слова
    const shuffled = shuffleArray(newWords);
    console.log('Порядок после перемешивания:', shuffled.map(word => word.word));

    setShuffledWords(shuffled);
    setCurrentWordIndex(0);
  };
};