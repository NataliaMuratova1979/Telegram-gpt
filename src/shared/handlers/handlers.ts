import { SetStateAction } from 'react';

interface MyFormData {
  theme: string | null;
  agree: boolean;
  option: string;
  lengthShort: boolean;
  lengthMedium: boolean;
  lengthLong: boolean;
}

// Обработчик выбора темы
export const handleThemeSelect = (
  theme: string,
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>,
  setSelectedTheme: React.Dispatch<React.SetStateAction<string | null>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return () => {
    setFormData((prev) => ({ ...prev, theme }));
    console.log('Тема в форме обновлена:', theme);
    setSelectedTheme(theme);
    setIsModalOpen(true);
  };
};

// Обработчик чекбокса согласия
export const handleCheckboxChange = (
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>
) => {
  return (value: boolean) => {
    setFormData((prev) => ({ ...prev, agree: value }));
    console.log('Чекбокс отмечен:', value);
  };
};

// Обработчик радиокнопки
export const handleRadioChange = (
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>
) => {
  return (value: string) => {
    setFormData((prev) => ({ ...prev, option: value }));
    console.log('Выбрана опция радиобокса:', value);
  };
};

// Тип для допустимых значений длины
type LengthLabel = '' | 'короткое' | 'среднее' | 'длинное';

// Функция для преобразования выбранной метки в допустимый тип
const parseLengthLabel = (label: string): LengthLabel => {
  if (
    label === 'короткое' ||
    label === 'среднее' ||
    label === 'длинное'
  ) {
    return label;
  }
  return '';
};

// Параметры для функции отправки данных
interface HandleSendDataParams {
  formData: MyFormData;
  setWords: React.Dispatch<React.SetStateAction<any[]>>;
  getWords: (
    theme: string,
    length: LengthLabel,
    count: number | 'Много'
  ) => Promise<{ word: string }[]>;
  selectedLengthLabel: string; // выбранная длина слова в UI
}

// Функция отправки данных
export const handleSendData = async ({
  formData,
  setWords,
  getWords,
  selectedLengthLabel,
}: HandleSendDataParams) => {
  const theme = formData.theme;

  if (!theme) {
    alert('Пожалуйста, выберите тему');
    return;
  }

  // Примерно определяете количество слов
  const count: number | 'Много' = 10; // Или логика по вашему

  const length: LengthLabel = parseLengthLabel(selectedLengthLabel);

  try {
    const results = await getWords(theme, length, count);
    
    // Фильтрация по длине слова
    const mapLengthToFilter = (label: LengthLabel) => {
      switch (label) {
        case 'короткое':
          return (w: { word: string }) => w.word.length < 5;
        case 'среднее':
          return (w: { word: string }) => w.word.length >= 5 && w.word.length <= 8;
        case 'длинное':
          return (w: { word: string }) => w.word.length > 8;
        default:
          return () => true;
      }
    };

    const lengthFilter = mapLengthToFilter(length);
    const filteredWords = results.filter(lengthFilter);
    setWords(filteredWords);
  } catch (error) {
    console.error('Ошибка при получении слов:', error);
  }
};