import React, { createContext, useReducer } from 'react';
import type { ICategory, IWord } from '../api/types';

// Определение действий для редьюсера
export type AppAction =
  | { type: 'SET_CATEGORIES'; payload: ICategory[] }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_TOPIC'; payload: string | null }
  | { type: 'SET_CATEGORY_WORDS'; payload: IWord[] }
  | { type: 'SET_CURRENT_WORD_INDEX'; payload: number }
  | { type: 'ADD_ANSWER'; payload: { index: number; correct: boolean } }
  | { type: 'SET_ANSWERED_WORDS'; payload: { index: number; correct: boolean }[] }; // обязательно массив

// Структура состояния
export interface State {
  categories: ICategory[];
  activeCategory: string | null;
  activeTopic: string | null;
  categoryWords: IWord[]; // Все слова выбранной категории
  currentWordIndex: number; // Индекс текущего слова
  answeredWords: { index: number; correct: boolean }[]; // история ответов
}

// Изначальный стейт
export const initialState: State = {
  categories: [],
  activeCategory: null,
  activeTopic: null,
  categoryWords: [],
  currentWordIndex: 0,
  answeredWords: [],
};



// Редьюсер
function reducer(state: State, action: AppAction): State {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };

    case 'SET_CATEGORY':
      return {
        ...state,
        activeCategory: action.payload,
        activeTopic: null, // при смене категории сбрасываем тему
        categoryWords: [], // очищаем слова
        currentWordIndex: 0,
        answeredWords: [], // очищаем ответы
      };

    case 'SET_TOPIC':
      return { ...state, activeTopic: action.payload };

    case 'SET_CATEGORY_WORDS':
      return { ...state, categoryWords: action.payload };

    case 'SET_CURRENT_WORD_INDEX':
      return { ...state, currentWordIndex: action.payload };

    case 'ADD_ANSWER':
      return {
        ...state,
        answeredWords: [...state.answeredWords, action.payload],
      };

    case 'SET_ANSWERED_WORDS':
      return { ...state, answeredWords: action.payload };

    default:
      return state;
  }
}

type GameContextType = {
  state: State;
  dispatch: React.Dispatch<AppAction>;
};

// Создаем контекст
const GameContext = createContext<GameContextType | null>(null);

// Провайдер
export const GameProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;