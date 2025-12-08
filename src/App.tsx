import React from 'react';
import { Title } from './shared/ui/Title';
import './app/styles/index.css';

export const App: React.FC = () => {
  return (
    <div>
      <Title as="h1">Заголовок</Title>
      <p>Здесь будет взаимодействие с Telegram API.</p>
    </div>
  );
};