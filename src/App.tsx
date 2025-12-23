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

export const App: React.FC = () => {
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

  const [words, setWords] = useState<IWord[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [radioValue, setRadioValue] = useState<string>('option1');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const buttonsData = Array.from({ length: 20 }, (_, i) => ({
    label: `Кнопка ${i + 1}`,
  }));

  // Логика для отслеживания изменений слов
  useEffect(() => {
    if (words.length > 0) {
      console.log('Отображены слова:', words);
    }
  }, [words]);

  const handleThemeSelect = (theme: string) => {
    setFormData(prev => ({ ...prev, theme }));
    console.log('Тема в форме обновлена:', theme);
    setSelectedTheme(theme);
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (value: boolean) => {
    setFormData(prev => ({ ...prev, agree: value }));
    console.log('Чекбокс отмечен:', value);
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, option: value }));
    console.log('Выбрана опция радиобокса:', value);
  };

  const handleSendData = async () => {
    if (!formData.theme) {
      alert('Пожалуйста, выберите тему');
      return;
    }
    let lengthParam: '' | 'короткое' | 'среднее' | 'длинное' = '';
    if (formData.lengthShort) lengthParam = 'короткое';
    else if (formData.lengthMedium) lengthParam = 'среднее';
    else if (formData.lengthLong) lengthParam = 'длинное';

    const count: 5 | 10 | 'Много' = 10;

    try {
      const result = await getWords(formData.theme, lengthParam, count);
      console.log('Полученные слова:', result);
      setWords(result);
    } catch (error) {
      console.error('Ошибка при получении слов:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      
      {/* Кнопка для открытия модального окна */}
      <div style={{ marginBottom: '20px' }}>
        <p>Кнопка для открытия модального окна</p>
        <button onClick={() => setIsModalOpen(true)}>Открыть модальное окно</button>
      </div>

      {/* Радиобокс */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Выберите опцию:</h3>
        <RadioBox
          options={[
            { label: 'Опция 1', value: 'option1' },
            { label: 'Опция 2', value: 'option2' },
            { label: 'Опция 3', value: 'option3' },
          ]}
          selectedValue={radioValue}
          onChange={(value) => {
            console.log('Радио выбрано:', value);
            setRadioValue(value);
            handleRadioChange(value);
          }}
          name="sampleRadio"
          disabled={false}
        />
      </div>

      {/* Блок выбора по длине */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Выберите длину слов:</h4>
        {/* Короткие */}
        <CheckBox
          label="Короткие"
          checked={formData.lengthShort}
          onChange={(value) => {
            setFormData(prev => ({ ...prev, lengthShort: value }));
            console.log('Короткие:', value);
          }}
        />
        {/* Средние */}
        <CheckBox
          label="Средние"
          checked={formData.lengthMedium}
          onChange={(value) => {
            setFormData(prev => ({ ...prev, lengthMedium: value }));
            console.log('Средние:', value);
          }}
        />
        {/* Длинные */}
        <CheckBox
          label="Длинные"
          checked={formData.lengthLong}
          onChange={(value) => {
            setFormData(prev => ({ ...prev, lengthLong: value }));
            console.log('Длинные:', value);
          }}
        />

        {/* Кнопка для отправки */}
        <div style={{ marginTop: '40px' }}>
          <Button onClick={handleSendData}>Отправить запрос на сервер</Button>
        </div>

        {/* Отображение слов */}
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
          <p>Вы выбрали тему: {selectedTheme}</p>
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

      {/* ThemesButtons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>ThemesButtons</h3>
        <ThemesButtons
          onThemeSelect={(theme: string) => handleThemeSelect(theme)}
        />
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

      {/* Кнопка для отправки данных */}
      <div style={{ marginTop: '40px' }}>
        <Button onClick={handleSendData}>Отправить данные</Button>
      </div>
    </div>
  );
};