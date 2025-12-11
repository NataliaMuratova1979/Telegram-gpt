import React from 'react';
import { Title } from './shared/ui/Title';
import { Button } from './shared/ui/Button';
import './app/styles/index.css';
// import "./app/styles/index.css";

export const App: React.FC = () => {
  return (
    <div>
      <Title as="h1">Заголовок</Title>
      <p>Здесь будет взаимодействие с Telegram API.</p>
      <Button></Button>
    </div>
  );
};