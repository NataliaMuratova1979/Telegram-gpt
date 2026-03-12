// context/GameContext.tsx
import React, { createContext, useReducer } from 'react'; // Импортируем React и нужные хуки: createContext и useReducer
import type { ICategory, ITopic, IWord } from '../api/types'; // Импортируем типы вложенной структуры категорий (категория → тема → слово)

// ТИПЫ
// context/GameContext.tsx

export type AppAction =
  | { type: 'SET_CATEGORIES'; payload: ICategory[] }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_TOPICS'; payload: any }
  | { type: 'SET_TOPIC'; payload: string | null } // новая
  | { type: 'SET_CURRENT_WORD'; payload: string }
  | { type: 'SET_OPTIONS'; payload: any }
  | { type: 'ANSWER'; payload: any }
  | { type: 'RESET_GAME' };

export interface State {
  categories: ICategory[];
  currentTopic: string | null; // новая
  // ... другие поля вашего state (если есть)
}

const initialState: State = {
  categories: [],
  currentTopic: null, // новая
  // ... инициализация остальных полей
};

function reducer(state: State, action: AppAction): State {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    // ваши существующие кейсы...
    case 'SET_TOPIC':
      return { ...state, currentTopic: action.payload };
    default:
      return state;
  }
}

const GameContext = createContext<{ state: State; dispatch: React.Dispatch<AppAction> } | null>(null);

export const GameProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;