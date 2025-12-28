import { SetStateAction } from 'react';

// Интерфейс для формы, описывающий структуру данных формы
export interface MyFormData {
  topic: string;             // выбранная тема
  agree: boolean;            // согласие (чекбокс)
  option: string;            // выбранная опция радиокнопки
  lengthShort: boolean;      // чекбокс для коротких слов
  lengthMedium: boolean;     // чекбокс для средних слов
  lengthLong: boolean;       // чекбокс для длинных слов
  selectedLength: string[];  // массив выбранных меток длины (может быть опциональным)
}

// Изначальное состояние формы по умолчанию
export const initialState: MyFormData = {
  topic: '',
  agree: false,
  option: '',
  lengthShort: false,
  lengthMedium: false,
  lengthLong: false,
  selectedLength: []
};

// Тип для количества слов: "Немного", "Много" или конкретное число
export type WordCount = 'Немного' | 'Много' | 'Все';

// Обработчик изменения чекбокса соглашения
export const handleCheckboxChange = (
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>
) => {
  return (value: boolean) => {
    // Обновление поля agree в состоянии формы
    setFormData(prev => ({ ...prev, agree: value }));
    console.log('Чекбокс отмечен:', value);
  };
};

// Обработчик изменения радиобокса
export const handleRadioChange = (
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>
) => {
  return (value: string) => {
    // Обновление выбранной опции
    setFormData(prev => ({ ...prev, option: value }));
    console.log('Выбрана опция радиобокса:', value);
  };
};

// Тип для метки длины слова: короткое, среднее, длинное или null
export type LengthLabel = 'короткое' | 'среднее' | 'длинное' | null;

/**
 * Функция для определения метки длины слова по самому слову
 * @param word - слово для определения
 * @returns соответствующая метка
 */
function getLengthLabel(word: string): LengthLabel {
  const length = word.length;
  if (length < 5) return 'короткое';                 // менее 5 символов
  else if (length >= 5 && length <= 8) return 'среднее'; // от 5 до 8
  else return 'длинное';                            // более 8
}

// Тип функции получения слов с сервера / источника данных
type GetWordsFunction = (
  theme: string,
  length: LengthLabel[] | 'все',            // массив меток длины или 'все'
  count: number | 'Много'                     // число слов или 'Много'
) => Promise<{ word: string }[]>;             // возвращает промис с массивом объектов с `word`

// Интерфейс для состояния чекбоксов длины
interface LengthSelections {
  lengthShort: boolean;   // чекбокс для коротких слов
  lengthMedium: boolean;  // чекбокс для средних слов
  lengthLong: boolean;    // чекбокс для длинных слов
}

// Интерфейс для параметров функции handleSendData
interface HandleSendDataProps {
  theme: string | null;                               // выбранная тема или null, если не выбрана
  radioValue: string;                                 // значение радиобокса: «немного», «много», «все»
  lengthSelections: LengthSelections;                // объект с состоянием чекбоксов для длины слов
  setWords: React.Dispatch<React.SetStateAction<any[]>>; // функция обновления массива слов
  getWords: GetWordsFunction;                         // функция получения слов
}

/**
 * Основная функция для обработки отправки данных
 * @param param0 - объект с параметрами
 */
export const handleSendData = async ({
  theme,                // выбранная тема
  radioValue,           // выбранное значение радиокнопки
  lengthSelections,     // состояния чекбоксов длины слов
  setWords,             // функция для установки списка слов
  getWords,             // функция для получения слов
}: HandleSendDataProps) => {
  // Проверка, выбрана ли тема
  if (!theme) {
    alert('Пожалуйста, выберите тему');   // Предупреждение, если тема не выбрана
    return;                                // Прерывание работы функции
  }

  // Определение количества слов based на радиоблок
  let count: number | 'Много';            // переменная для количества слов
  switch (radioValue) {
    case 'немного':                        // если выбрано "немного"
      count = 5;                          // 5 слов
      break;
    case 'много':                         // если выбрано "много"
      count = 12;                         // 12 слов
      break;
    case 'все':                           // если "все"
      count = 'Много';                    // весь список (или большое количество)
      break;
    default:
      count = 10;                         // дефолтное значение (при необходимости)
  }

  // Распаковка состояния чекбоксов длины
  const { lengthShort, lengthMedium, lengthLong } = lengthSelections;
  const selectedLengths: LengthLabel[] = []; // массив выбранных меток длины

  // Добавление соответствующих меток в массив
  if (lengthShort) selectedLengths.push('короткое');
  if (lengthMedium) selectedLengths.push('среднее');
  if (lengthLong) selectedLengths.push('длинное');

  try {
    // Вызов функции получения слов с сервера/источника по выбранной теме, длине и количеству
    const results = await getWords(
      theme,
      selectedLengths.length > 0 ? selectedLengths : 'все', // если есть выбранные метки, передать их, иначе 'все'
      count
    );

    // Если есть выбранные метки, фильтруем результаты по длине
    const filteredResults = selectedLengths.length
      ? results.filter((wordObj) => {
          const len = wordObj.word.length; // длина слова
          // Проверка, подходит ли слово под одну из выбранных меток
          return selectedLengths.some((label) => {
            if (label === 'короткое') return len < 5;
            if (label === 'среднее') return len >= 5 && len <= 8;
            if (label === 'длинное') return len > 8;
          });
        })
      : results; // если метки не выбраны, оставить все слова

    // Обновление списка слов в состоянии компоненты
    setWords(filteredResults);
  } catch (error) {
    // Логирование ошибок получения данных
    console.error('Ошибка получения слов:', error);
  }
};