import React from 'react';
import { Title } from './shared/ui/Title';
import { Button } from './shared/ui/Button';
import ColorDivs from './shared/ui/ColorDivs';
import ColorfulButtons from './shared/ui/ColorfulButtons';
import ThemesButtons from './shared/ui/ThemesButtons'; 
import './app/styles/index.css';
import { CloseButton } from './shared/ui/CloseButton';

// Импорт компонента с кнопкой для вывода тем
import ButtonThemes from './api/mockExample'; // укажите правильный путь, где находится ваш ButtonThemes.tsx

export const App: React.FC = () => {
  const buttonsData = Array.from({ length: 20 }, (_, i) => ({
    label: `Кнопка ${i + 1}`,
  }));

  return (
    <div style={{ padding: 20 }}>
      <Title as="h1">Заголовок</Title>
      <Title as="h2">Чередование цвета для списка кнопок.</Title>
      
      <ColorfulButtons />

      {/* вставляем компонент тем */}
      <ThemesButtons />

      {/* Вставляем кнопку "Показать темы" */}
      <ButtonThemes /> 

      <CloseButton
  actionType="close"
  onClose={() => console.log('Закрытие модалки')}
/>

<CloseButton
  actionType="exit"
  onExit={() => console.log('Выход из приложения')}
/>

      {/* Рендерим все остальные кнопки */}
      {buttonsData.map((btn, idx) => (
        <Button
          key={idx}
          type="colorful"
          index={idx}
          style={{ marginRight: 10, marginBottom: 10 }}
        >
          {btn.label}
        </Button>
      ))}
    </div>
  );
};