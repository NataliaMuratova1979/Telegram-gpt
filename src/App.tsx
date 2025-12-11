import React from 'react';
import { Title } from './shared/ui/Title';
import { Button } from './shared/ui/Button';
import ColorDivs from './shared/ui/ColorDivs';
import './app/styles/index.css';

export const App: React.FC = () => {
  const buttonsData = Array.from({ length: 20 }, (_, i) => ({
    label: `Кнопка ${i + 1}`,
    // другие свойства для кнопки, если нужно
  }));

  return (
    <div style={{ padding: 20 }}>
      <Title as="h1">Заголовок</Title>
      <Title as="h2">Чередование цвета для списка кнопок.</Title>
      <ColorDivs />
      {/* рендерим все кнопки, цвета чередуются */}
      {buttonsData.map((btn, idx) => (
        <Button
          key={idx}
          type="colorful"
          index={idx} // используем индекс глобально для чередования
          style={{ marginRight: 10, marginBottom: 10 }}
        >
          {btn.label}
        </Button>
        
      ))}
    </div>
  );
};