import React, { useContext, useEffect } from 'react';
import GameContext from '../../context/GameContext';

const WordGame: React.FC = () => {
  // Получение контекста с типизацией
  const ctx = useContext<{ state: typeof import('../../context/GameContext').initialState; dispatch: React.Dispatch<any> } | null>(GameContext);
  if (!ctx) return null;
  const { state, dispatch } = ctx;

  // Получите слова
  const words = state.categoryWords ?? [];

  useEffect(() => {
    console.log('Обновление слов для игры:', words);
  }, [words]);

  // Ваша логика отображения и переключения слов
  return (
    <div>
      {/* Например, вывод текущего слова или логика переключения */}
      <h2>Количество слов: {words.length}</h2>
      {/* Можно добавить отображение случайного слова или кнопку для смены */}
    </div>
  );
};

export default WordGame;