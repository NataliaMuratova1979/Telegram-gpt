// src/context/GameContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';

// Типы данных
export type ICategory = {
  category: string;
  topics: ITopic[];
};
export type ITopic = {
  topic: string;
  words: IWordItem[];
};
export type IWordItem = { word: string };

type State = {
  selectedLength: 'short' | 'medium' | 'long' | null;
  selectedCategory: ICategory | null;
  selectedTopics: [string, string] | null;
  currentWord: string | null;
  currentOptions: string[]; // две темы
  correctAnswers: number; // правильных ответов
  wrongAnswers: number;   // неправильных ответов
};

// Начальное состояние
const initialState: State = {
  selectedLength: null,
  selectedCategory: null,
  selectedTopics: null,
  currentWord: null,
  currentOptions: [],
  correctAnswers: 0,
  wrongAnswers: 0,
};

// Типы действий
type Action =
  | { type: 'SET_LENGTH'; payload: 'short' | 'medium' | 'long' }
  | { type: 'SET_CATEGORY'; payload: ICategory }
  | { type: 'SET_TOPICS'; payload: [string, string] }
  | { type: 'SET_CURRENT_WORD'; payload: string }
  | { type: 'SET_OPTIONS'; payload: string[] }
  | { type: 'ANSWER'; payload: boolean } // правильный (true) или неправильный (false)
  | { type: 'RESET_GAME' };


// Редуктор
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LENGTH':
      return { ...state, selectedLength: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_TOPICS':
      return { ...state, selectedTopics: action.payload };
    case 'SET_CURRENT_WORD':
      return { ...state, currentWord: action.payload };
    case 'SET_OPTIONS':
      return { ...state, currentOptions: action.payload }; // исправлено здесь
    case 'ANSWER':
      return {
        ...state,
        correctAnswers: action.payload ? state.correctAnswers + 1 : state.correctAnswers,
        wrongAnswers: !action.payload ? state.wrongAnswers + 1 : state.wrongAnswers,
      };
    case 'RESET_GAME':
      return {
        ...initialState,
        selectedLength: state.selectedLength,
      };
    default:
      return state;
  }
}

// Создаём контекст
const GameContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

// Провайдер
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;