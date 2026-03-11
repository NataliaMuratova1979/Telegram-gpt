import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import { GameProvider } from './src/context/GameContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);