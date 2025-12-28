import { SetStateAction } from 'react';

export interface MyFormData {
  topic: string;
  agree: boolean;
  option: string;
  lengthShort: boolean;
  lengthMedium: boolean;
  lengthLong: boolean;
  selectedLength?: string; // опциональное поле, если нужно
}

export const initialState: MyFormData = {
  topic: '',
  agree: false,
  option: '',
  lengthShort: false,
  lengthMedium: false,
  lengthLong: false,
};
export type WordCount = 'Немного' | 'Много' | 'Все';


// Обработчик чекбокса согласия
export const handleCheckboxChange = (
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>
) => {
  return (value: boolean) => {
    setFormData(prev => ({ ...prev, agree: value }));
    console.log('Чекбокс отмечен:', value);
  };
};

// Обработчик радиокнопки
export const handleRadioChange = (
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>
) => {
  return (value: string) => {
    setFormData(prev => ({ ...prev, option: value }));
    console.log('Выбрана опция радиобокса:', value);
  };
};

export type LengthLabel = 'короткое' | 'среднее' | 'длинное' | null;

function getLengthLabel(word: string): LengthLabel {
  const length = word.length;
  if (length < 5) return 'короткое';
  else if (length >= 5 && length <= 8) return 'среднее';
  else return 'длинное';
}

// Эта функция нужна при преобразовании строки в метку, например, если получаете строку из UI
function parseLengthLabel(label: string): LengthLabel {
  console.log('parseLengthLabel получил:', label);
  switch (label) {
    case 'короткое':
    case 'среднее':
    case 'длинное':
      return label;
    default:
      throw new Error('Неизвестная метка длины');
  }
}

type GetWordsFunction = (
  theme: string,
  length: LengthLabel[] | 'все', // допускаем массив или строку
  count: number | 'Много'
) => Promise<{ word: string }[]>;

interface LengthSelections {
  lengthShort: boolean;
  lengthMedium: boolean;
  lengthLong: boolean;
}

interface HandleSendDataProps {
  theme: string | null;
  radioValue: string; // «немного», «много», «все»
  lengthSelections: LengthSelections; // состояние чекбоксов
  setWords: React.Dispatch<React.SetStateAction<any[]>>;
  getWords: GetWordsFunction;
}

// Основная функция отправки данных
export const handleSendData = async ({
  theme,
  radioValue,
  lengthSelections,
  setWords,
  getWords,
}: HandleSendDataProps) => {
  if (!theme) {
    alert('Пожалуйста, выберите тему');
    return;
  }

  // Варианты количества слов
  let count: number | 'Много';
  switch (radioValue) {
    case 'немного':
      count = 5;
      break;
    case 'много':
      count = 12;
      break;
    case 'все':
      count = 'Много';
      break;
    default:
      count = 10;
  }

  // Собираем выбранные метки
  const { lengthShort, lengthMedium, lengthLong } = lengthSelections;
  const selectedLengths: LengthLabel[] = [];
  if (lengthShort) selectedLengths.push('короткое');
  if (lengthMedium) selectedLengths.push('среднее');
  if (lengthLong) selectedLengths.push('длинное');

  try {
    // Вызов функции getWords
    const results = await getWords(theme, selectedLengths.length > 0 ? selectedLengths : 'все', count);

    // Фильтрация результатов по длине, если выбраны метки
    let filteredResults = results;
    if (selectedLengths.length > 0) {
      filteredResults = results.filter((wordObj) => {
        const wordLen = wordObj.word.length;
        return selectedLengths.some((label) => {
          if (label === 'короткое') return wordLen < 5;
          if (label === 'среднее') return wordLen >= 5 && wordLen <= 8;
          if (label === 'длинное') return wordLen > 8;
        });
      });
    }

    setWords(filteredResults);
  } catch (error) {
    console.error('Ошибка получения слов:', error);
  }
};