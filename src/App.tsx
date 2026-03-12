// src/App.tsx
'use client'; // если вы используете Next.js, это клиентский компонент

import React, { useContext, useEffect, useState } from 'react';
import GameContext from './context/GameContext';
import { getCategories } from './api/mockApi';
import CategoryButtons from './components/CategoryButtons';
import TopicButton from './components/TopicButton';

const App: React.FC = () => {
  const ctx = useContext(GameContext);

  if (!ctx) return null;

  const { state, dispatch } = ctx;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  // Найти текущую категорию для отображения её тем
  const currentCategory = categories.find((c) => c.category === activeCategory);

  return (
    <div> 
      <h1>Категории</h1>

      {/* Контейнер кнопок: передаём данные и обработчик выбора */}
      <CategoryButtons
        categories={categories}
        onSelectCategory={(category) => {
          console.log('Выбрана категория:', category);
          setActiveCategory(category);
          dispatch({ type: 'SET_CATEGORY', payload: category });
        }}
      />

      {/* Под выбранной категорией показываем две темы и их слова (слова загружаются вместе с данными) */}
      {activeCategory && currentCategory && (
        <div style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 8 }}>Темы:</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {currentCategory.topics.slice(0, 2).map((t) => (
              <div key={t.topic} style={{ display: 'flex', flexDirection: 'column' }}>
                <TopicButton
                  topic={t.topic}
                  onSelect={(name) => {
                    console.log('Выбрана тема:', name);
                    dispatch({ type: 'SET_TOPIC', payload: name });
                  }}
                />
                <ul style={{ marginTop: 6 }}>
                  {t.words.map((w) => (
                    <li key={w.word}>{w.word}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

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