// App.tsx
'use client'; // если вы используете Next.js, это клиентский компонент

import React, { useContext, useEffect } from 'react';
import GameContext from './context/GameContext';
import { getCategories } from './api/mockApi';
import { CategoryButtons } from './components/CategoryButtons'; // импорт нового контейнера кнопок

const App: React.FC = () => {
  const ctx = useContext(GameContext);

  if (!ctx) return null;

  const { state, dispatch } = ctx;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        console.log('Категории загружены:', cats);
        dispatch({ type: 'SET_CATEGORIES', payload: cats });
      } catch (err) {
        console.error('Ошибка загрузки категорий:', err);
      }
    };

    loadCategories();
  }, [dispatch]);

  // state.categories теперь ICategory[] (модель с вложенной структурой)
  const categories = state.categories ?? [];

  if (!categories.length) {
    return <div>Загрузка категорий...</div>;
  }

  return (
    <div> // контейнер страницы
      <h1>Категории</h1>

      {/* Контейнер кнопок: передаём данные и обработчик выбора */}
      <CategoryButtons
        categories={categories}
        onSelectCategory={(category) => {
          console.log('Выбрана категория:', category);
          dispatch({ type: 'SET_CATEGORY', payload: category });
        }}
      />

      {/* Дополнительная часть UI: вложенная структура категорий (не обязательно) */}
      {categories.map((cat) => (
        <div key={cat.category} style={{ marginTop: 16 }}>
          <h2>{cat.category}</h2>
          {cat.topics.map((t) => (
            <div key={t.topic} style={{ marginLeft: 16 }}>
              <strong>{t.topic}</strong>
              <ul>
                {t.words.map((w) => (
                  <li key={w.word}>{w.word}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;