import React, { useState, useEffect } from 'react';
import { Title } from './shared/ui/Title';
import { Button } from './shared/ui/Button';
import './app/styles/index.css';
import { CloseButton } from './shared/ui/CloseButton';
import CategoryButtons from './api/mockExample';
import Modal from './shared/ui/Modal';
import CheckBox from './shared/ui/CheckBox';
import RadioBox from './shared/ui/RadioBox';
import { getWords } from './api/mockApi';
import { IWord } from './api/types';
import {
  handleThemeSelect,
  handleCheckboxChange,
  handleRadioChange,
  handleSendData,
} from './shared/handlers/handlers';

export const App: React.FC = () => {
  // Начальные данные формы
  const [formData, setFormData] = useState<{
    theme: string | null;
    agree: boolean;
    option: string;
    lengthShort: boolean;
    lengthMedium: boolean;
    lengthLong: boolean;
  }>({
    theme: null,
    agree: false,
    option: 'option1',
    lengthShort: false,
    lengthMedium: false,
    lengthLong: false,
  });

  const [words, setWords] = useState<IWord[]>([]); // слова для отображения
  const [isModalOpen, setIsModalOpen] = useState(false); // управление модальным
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null); // выбранная тема
  const [radioValue, setRadioValue] = useState<string>('option1'); // радиобокс
  const buttonsData = Array.from({ length: 20 }, (_, i) => ({ label: `Кнопка ${i + 1}` }));

  // Выбор темы
  const onThemeSelect = (theme: string) => {
    handleThemeSelect(theme, setFormData, setSelectedTheme, setIsModalOpen)();
  };

  // Обработчик чекбоксов
  const handleCheckbox = (field: keyof typeof formData, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Обработчик радиобокса
  const handleRadio = (value: string) => {
    setRadioValue(value);
    handleRadioChange(setFormData)(value);
  };

  // Получение метки для фильтрации
  const getSelectedLengthLabel = () => {
    const { lengthShort, lengthMedium, lengthLong } = formData;
    if (lengthShort && !lengthMedium && !lengthLong) return 'короткое';
    if (!lengthShort && lengthMedium && !lengthLong) return 'среднее';
    if (!lengthShort && !lengthMedium && lengthLong) return 'длинное';
    return 'все';
  };

  // Обработка отправки
  const handleClickSend = () => {
    handleSendData({
      formData,
      setWords,
      getWords,
      selectedLengthLabel: getSelectedLengthLabel(),
    });
  };

  // Логирование слов
  useEffect(() => {
    if (words.length > 0) {
      console.log('Отображены слова:', words);
    }
  }, [words]);

  return (
    <div style={{ padding: 20 }}>
      
    

      {/* Кнопка открытия модального */}
      <div style={{ marginBottom: '20px' }}>
        <p>Кнопка для открытия модального окна</p>
        <button onClick={() => setIsModalOpen(true)}>Открыть модальное окно</button>
      </div>

      {/* Выбор по длине */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Выберите длину слов:</h4>
        <CheckBox
          label="Короткие"
          checked={formData.lengthShort}
          onChange={(value: boolean) => handleCheckbox('lengthShort', value)}
        />
        <CheckBox
          label="Средние"
          checked={formData.lengthMedium}
          onChange={(value: boolean) => handleCheckbox('lengthMedium', value)}
        />
        <CheckBox
          label="Длинные"
          checked={formData.lengthLong}
          onChange={(value: boolean) => handleCheckbox('lengthLong', value)}
        />

        {/* Кнопка отправки */}
        <div style={{ marginTop: '40px' }}>
          <Button onClick={handleClickSend}>Отправить запрос на сервер</Button>
        </div>

        {/* Результаты */}
        {words.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>Результаты:</h4>
            <ul>
              {words.map((word, index) => (
                <li key={index}>{word.word}</li>
              ))}
            </ul>
          </div>
        )}
      </div>


      
          {/* ButtonThemes */}
      <div style={{ marginBottom: '20px' }}>
        <h4>CategoryButtons, mockExample</h4>
        <CategoryButtons
  onCategorySelect={(data) => {
    console.log('Выбранная категория:', data.category);
    console.log('Темы:', data.topics);
  }}
/>
      </div>

         {/* Close buttons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>CloseButton (Закрытие)</h3>
        <CloseButton
          actionType="close"
          onClose={() => console.log('Закрытие модалки')}
        />
      </div>

      
    </div>
  );
};