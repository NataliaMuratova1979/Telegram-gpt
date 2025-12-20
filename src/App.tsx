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

export const App: React.FC = () => {
  // Все хуки — внутри компонента
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  
  // Массив для создания 20 кнопок
  const buttonsData = Array.from({ length: 20 }, (_, i) => ({
    label: `Кнопка ${i + 1}`,
  }));

  return (
    <div style={{ padding: 20 }}>
      {/* Кнопка для открытия модального окна */}
      <button onClick={() => setIsModalOpen(true)}>
        Открыть модальное окно
      </button>

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Тема выбрана"
      >
        <p>Вы выбрали тему: {selectedTheme}</p>
      </Modal>

      {/* Остальной интерфейс */}
      <Title as="h1">Заголовок</Title>
      <Title as="h2">Чередование цвета для списка кнопок.</Title>

      <ColorfulButtons />

      {/* Передаем обработчик для темы */}
      <ThemesButtons
        onThemeSelect={(theme: string) => {
          setSelectedTheme(theme);
          setIsModalOpen(true);
        }}
      />

      <ButtonThemes />

      <CloseButton
        actionType="close"
        onClose={() => console.log('Закрытие модалки')}
      />

      <CloseButton
        actionType="exit"
        onExit={() => console.log('Выход из приложения')}
      />

      {/* Генерируем 20 кнопок */}
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
  );
};