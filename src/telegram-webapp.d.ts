// src/telegram-webapp.d.ts
interface TelegramWebApp {
  size: {
    height: number;
    width: number;
  };
  getHeight: () => number;
  getWidth: () => number;
  onEvent: (event: string, handler: () => void) => void;
  offEvent: (event: string, handler: () => void) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export {}; // Обязательно для расширения глобального пространства