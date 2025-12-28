import React, { useState, useEffect } from 'react';
import { Title } from './shared/ui/Title';
import { Button } from './shared/ui/Button';
import ColorDivs from './shared/ui/ColorDivs';
import ColorfulButtons from './shared/ui/ColorfulButtons';
import ThemesButtons from './shared/ui/ThemesButtons';
import './app/styles/index.css';
import { CloseButton } from './shared/ui/CloseButton';
import ButtonThemes from './api/mockExample';
import Modal from './shared/ui/Modal';
import CheckBox from './shared/ui/CheckBox';
import RadioBox from './shared/ui/RadioBox';
import { getWords } from './api/mockApi';
import { IWord } from './api/types';
import {
  handleCheckboxChange,
  handleRadioChange,
  MyFormData,
  LengthLabel,
  initialState,
  WordCount,
  handleSendData
} from './shared/handlers/handlers'; 

export const App: React.FC = () =>  {
  // Начальные данные формы
const [formData, setFormData] = useState<MyFormData>(initialState);

   const [words, setWords] = useState<IWord[]>([]); // слова для отображения
  const [isModalOpen, setIsModalOpen] = useState(false); // управление модальным
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // выбранная тема
  const [radioValue, setRadioValue] = useState<string>('option1'); // радиобокс
  const buttonsData = Array.from({ length: 20 }, (_, i) => ({ label: `Кнопка ${i + 1}` }));
  const [selectedLengths, setSelectedLengths] = React.useState<string[]>([]);

  const [count, setCount] = useState<WordCount>('Много'); // Изначально выбран "много"


  useEffect(() => {
    if (words.length > 0) {
      console.log('Отображены слова:', words);
    }
  }, [words]);

const handleThemeSelect = (
  theme: string,
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>,
  setSelectedTopic: React.Dispatch<React.SetStateAction<string | null>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Обновляем выбранную тему
  setSelectedTopic(theme);
  // Обновляем formData, присваивая теме значение
  setFormData(prev => ({ ...prev, topic: theme }));
  // Открываем модальное окно или выполнять другие действия
  setIsModalOpen(true);
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



// Объявляем функцию, которая возвращает допустимую метку
const getSelectedLengthLabel = (): LengthLabel => {
  if (formData.lengthShort) return 'короткое';
  if (formData.lengthMedium) return 'среднее';
  if (formData.lengthLong) return 'длинное';
  return null; // вместо ''
};

const handleClickSend = () => {
    // Убедимся, что topic из formData
    const topic = formData.topic; // Или другой способ получения темы
    // В зависимости от выбранных длины и count
    const lengthFilter = selectedLengths.length > 0 ? selectedLengths : 'все';

    getWords(topic, lengthFilter, count)
      .then((words) => {
        console.log('Полученные слова:', words);
        if (words.length === 0) {
          alert('Тема не найдена или слова отсутствуют для выбранных условий.');
        }
        setWords(words);
      })
      .catch((error) => {
        console.error('Ошибка при получении слов:', error);
        alert('Произошла ошибка при запросе к серверу.');
      });
  };

  console.log('topic:', formData.topic);
console.log('lengths:', selectedLengths);
console.log('count:', count);

  // Логирование слов
  useEffect(() => {
    if (words.length > 0) {
      console.log('Отображены слова:', words);
    }
  }, [words]);

  return (
    <div style={{ padding: 20 }}>
      
         {/* ThemesButtons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>ThemesButtons</h3>
  <ThemesButtons
  onThemeSelect={(theme) =>
    handleThemeSelect(theme, setFormData, setSelectedTopic, setIsModalOpen)
  }
/>
      </div>

      {/* Кнопка открытия модального */}
      <div style={{ marginBottom: '20px' }}>
        <p>Кнопка для открытия модального окна</p>
        <button onClick={() => setIsModalOpen(true)}>Открыть модальное окно</button>
      </div>

      {/* Радиобокс */}
<div style={{ marginBottom: '20px' }}>
  <h3>Выберите опцию:</h3>
  <RadioBox
    options={[
      { label: 'немного', value: 'немного' },
      { label: 'много', value: 'много' },
      { label: 'все', value: 'все' },
    ]}
    selectedValue={radioValue}
    onChange={handleRadio}
    name="sampleRadio"
    disabled={false}
  />
</div>

      {/* Выбор по длине */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Выберите длину слов:</h4>
        <CheckBox
  label="Короткие"
  checked={formData.lengthShort}
  onChange={(value: boolean) => {
    handleCheckbox('lengthShort', value);
    if (value) {
      setFormData(prev => ({ ...prev, selectedLength: 'Короткое' }));
    } else if (formData.lengthMedium || formData.lengthLong) {
      // если другие чекбоксы выбраны, можно оставить выбранное значение
    } else {
      setFormData(prev => ({ ...prev, selectedLength: undefined }));
    }
  }}
/>
<CheckBox
  label="Средние"
  checked={formData.lengthMedium}
  onChange={(value: boolean) => {
    handleCheckbox('lengthMedium', value);
    if (value) {
      setFormData(prev => ({ ...prev, selectedLength: 'Среднее' }));
    } else if (formData.lengthShort || formData.lengthLong) {
      // оставить предыдущие выбранные
    } else {
      setFormData(prev => ({ ...prev, selectedLength: undefined }));
    }
  }}
/>

<CheckBox
  label="Длинные"
  checked={formData.lengthLong}
  onChange={(value: boolean) => {
    handleCheckbox('lengthLong', value);
    if (value) {
      setFormData(prev => ({ ...prev, selectedLength: 'Длинное' }));
    } else if (formData.lengthShort || formData.lengthMedium) {
      // оставить предыдущие
    } else {
      setFormData(prev => ({ ...prev, selectedLength: undefined }));
    }
  }}
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

            {/* Модальное окно */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Модальное окно</h3>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Тема выбрана"
          modalType="option"
        >
          <p>Вы выбрали тему: {selectedTopic}</p>
        </Modal>
      </div>

            {/* ThemesButtons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>ThemesButtons</h3>
<ThemesButtons
  onThemeSelect={(theme) =>
    handleThemeSelect(theme, setFormData, setSelectedTopic, setIsModalOpen)
  }
/>
      </div>
      
      
      {/* Модальное окно */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Модальное окно</h3>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Тема выбрана"
          modalType="option"
        >
          <p>Вы выбрали тему: {selectedTopic}</p>
        </Modal>
      </div>

        {/* Заголовки */}
      <div style={{ marginBottom: '20px' }}>
        <Title as="h1">Заголовок</Title>
        <Title as="h2">Чередование цвета для списка кнопок</Title>
      </div>

      {/* Цветные кнопки */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Цветные кнопки</h3>
        <ColorfulButtons />
      </div>


          {/* ButtonThemes */}
      <div style={{ marginBottom: '20px' }}>
        <h3>ButtonThemes</h3>
        <ButtonThemes />
      </div>

         {/* Close buttons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>CloseButton (Закрытие)</h3>
        <CloseButton
          actionType="close"
          onClose={() => console.log('Закрытие модалки')}
        />
      </div>


          <div style={{ marginBottom: '20px' }}>
        <h3>CloseButton (Выход)</h3>
        <CloseButton
          actionType="exit"
          onExit={() => console.log('Выход из приложения')}
        />
      </div>

      {/* Генерация 20 кнопок */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Генерация 20 кнопок</h3>
        {buttonsData.map((btn, idx) => (
          <Button
            key={idx}
            type="colorful"
            index={idx}
            style={{ marginRight: 10, marginBottom: 10 }}
            onClick={() => console.log(`Пользователь выбрал тему "${btn.label}"`)}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      {/* Модальное окно */}
      <Modal isOpen={isModalOpen} modalType="option" onClose={() => setIsModalOpen(false)}>
        {/* Тут можно разместить содержимое модалки */}
        <CloseButton onClick={() => setIsModalOpen(false)} />
        <h2>Модальное окно</h2>
        {/* Например, можно разместить сюда форму или другую логику */}
      </Modal>
      
    
      
    </div>
  );
};