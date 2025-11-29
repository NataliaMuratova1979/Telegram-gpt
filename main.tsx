import React from 'react';
import ReactDOM from 'react-dom/client';

function App(): React.ReactElement {
  return (
    <div>
      <h1>Мини-приложение для Telegram</h1>
      <p>Здесь будет взаимодействие с Telegram API.</p>
    </div>
  );
}

// Предполагается, что в HTML есть элемент с id="root"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);