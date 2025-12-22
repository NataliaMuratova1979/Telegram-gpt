import React, { useState } from 'react';
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

export const App: React.FC = () => {
  // Общее состояние формы для отправки
  const [formData, setFormData] = useState<{
    theme: string | null;
    agree: boolean;
    option: string;
  }>({
    theme: null,
    agree: false,
    option: 'option1',
  });

  // Локальные стейты для компонента
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [radioValue, setRadioValue] = useState<string>('option1');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Массив для генерации 20 кнопок
  const buttonsData = Array.from({ length: 20 }, (_, i) => ({
    label: `Кнопка ${i + 1}`,
  }));

  ///////////////////////////////////////////
  // Обработчики для формы
  ///////////////////////////////////////////

  // Обработчик выбора темы (из ThemesButtons или другого UI)
  const handleThemeSelect = (theme: string) => {
    setFormData(prev => ({ ...prev, theme }));
    console.log('Тема в форме обновлена:', theme);
    setSelectedTheme(theme);
    setIsModalOpen(true);
  };

  // Обработчик чекбокса
  const handleCheckboxChange = (value: boolean) => {
    setFormData(prev => ({ ...prev, agree: value }));
    console.log('Чекбокс отмечен:', value);
  };

  // Обработчик радио
  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, option: value }));
    console.log('Выбрана опция радиобокса:', value);
  };

  // Обработчик отправки
  const handleSendData = () => {
    console.log('Отправляемая форма:', formData);
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

      {/* Чекбокс */}
      <div style={{ marginBottom: '20px' }}>
        <CheckBox
          label="Согласен с условиями"
          checked={isChecked}
          onChange={(value) => {
            setIsChecked(value);
            handleCheckboxChange(value);
          }}
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

      {/* Кнопка отправки формы с выводом в консоль */}
      <div style={{ marginTop: '40px' }}>
        <Button onClick={handleSendData}>Отправить данные</Button>
      </div>
    </div>
  );
};