// context/GameContext.tsx
import React, { createContext, useReducer } from 'react'; // Импортируем React и нужные хуки: createContext и useReducer
import type { ICategory, ITopic, IWord } from '../api/types'; // Импортируем типы вложенной структуры категорий (категория → тема → слово)

// ТИПЫ
export type AppAction =
  | { type: 'SET_CATEGORIES'; payload: ICategory[] } // Действие: загрузить/установить весь дерево категорий (ICategory[])
  | { type: 'SET_CATEGORY'; payload: string } // Действие: установить текущую категорию (пример)
  | { type: 'SET_TOPICS'; payload: any } // Действие: обновить темы внутри категории (пример)
  | { type: 'SET_CURRENT_WORD'; payload: string } // Действие: установить текущее слово
  | { type: 'SET_OPTIONS'; payload: any } // Действие: задать опции (пример)
  | { type: 'ANSWER'; payload: any } // Действие: ответ или результат
  | { type: 'RESET_GAME' }; // Действие: сбросить игру

// Стейт приложения
export interface State {
  categories: ICategory[]; // Храним дерево категорий (ICategory[]) — каждая категория содержит темы и слова
  // ... другие поля вашего state (например, currentCategory, topics и т.д.)
}

// начальное состояние
const initialState: State = {
  categories: [], // инициализируем пустым массивом категорий
  // ... инициализация остальных полей (если есть)
};

// редьюсер
function reducer(state: State, action: AppAction): State {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }; // обновляем дерево категорий (payload: ICategory[])
    // здесь должны быть ваши существующие кейсы, например:
    // case 'SET_CATEGORY': return { ...state, currentCategory: action.payload };
    // ...
    default:
      return state; // по умолчанию возвращаем текущее состояние
  }
}

// контекст
const GameContext = createContext<{ state: State; dispatch: React.Dispatch<AppAction> } | null>(null); // создаём контекст с типами state и dispatch либо null

type Props = { children?: React.ReactNode }; // пропсы для провайдера: могут быть дети

// провайдер контекста
export const GameProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // создаём локальный state и dispatch через useReducer
  return (
    <GameContext.Provider value={{ state, dispatch }}> // оборачиваем дочерние элементы в провайдер контекста
      {children}
    </GameContext.Provider>
  );
};

// экспорт контекста по умолчанию
export default GameContext; // экспорт по умолчанию для удобного импорта в другие файлы