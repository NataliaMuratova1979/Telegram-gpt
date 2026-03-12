// src/App.tsx
'use client'; // если вы используете Next.js, это клиентский компонент

import React, { useContext, useEffect, useState } from 'react';
import GameContext from './context/GameContext';
import { fetchCategories } from './services/categoryApi';
import { ICategory } from './api/types';
import CategoryButtons from './components/CategoryButtons';
import TopicButton from './components/TopicButton';
import WordCarousel from './components/WordCarousel';
import { useCategoryWords } from './hooks/useCategoryWords';
import { WordItem } from './utils/categoryWords';

const App: React.FC = () => {
  const ctx = useContext(GameContext);

  if (!ctx) return null;

  const { state, dispatch } = ctx;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // выбранная тема для фильтрации слов в карусели
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Массив слов для активной категории получаем через хук
  const categories = state.categories ?? [];
  const categoryWords: WordItem[] = useCategoryWords(categories, activeCategory);

  // Сбрасываем тему при смене категории
  useEffect(() => {
    setSelectedTopic(null);
  }, [activeCategory]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        console.log('Категории загружены:', cats);
        dispatch({ type: 'SET_CATEGORIES', payload: cats });
      } catch (err) {
        console.error('Ошибка загрузки категорий:', err);
      }
    };

    loadCategories();
  }, [dispatch]);

  // Удобная безопасная запись текущей категории
  const currentCategory = categories.find((c) => c.category === activeCategory);

  if (!categories.length) {
    return <div>Загрузка категорий...</div>;
  }

  // Фильтр слов карусели по выбранной теме (если тема не выбрана — показываем все слова)
  const wordsForCarousel = selectedTopic
    ? categoryWords.filter((w) => w.topic === selectedTopic)
    : categoryWords;

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
        <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
          {/* Первая тема */}
          {currentCategory.topics[0] && (
            <div
              key={currentCategory.topics[0].topic}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <TopicButton
                topic={currentCategory.topics[0].topic}
                onSelect={(name) => {
                  console.log('Выбрана тема:', name);
                  dispatch({ type: 'SET_TOPIC', payload: name });
                  setSelectedTopic(currentCategory.topics[0].topic);
                }}
              />
              <ul style={{ marginTop: 6 }}>
                {currentCategory.topics[0].words.map((w: any) => (
                  <li key={(typeof w === 'string' ? w : w.word) as string}>
                    {typeof w === 'string' ? w : w.word}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Карусель слов между двумя темами */}
          <WordCarousel words={wordsForCarousel} interval={1500} />

          {/* Вторая тема */}
          {currentCategory.topics[1] && (
            <div
              key={currentCategory.topics[1].topic}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <TopicButton
                topic={currentCategory.topics[1].topic}
                onSelect={(name) => {
                  console.log('Выбрана тема:', name);
                  dispatch({ type: 'SET_TOPIC', payload: name });
                  setSelectedTopic(currentCategory.topics[1].topic);
                }}
              />
              <ul style={{ marginTop: 6 }}>
                {currentCategory.topics[1].words.map((w: any) => (
                  <li key={(typeof w === 'string' ? w : w.word) as string}>
                    {typeof w === 'string' ? w : w.word}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Дополнительная часть UI: отображение всех слов выбранной категории */}
      {categoryWords.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h3>Слова выбранной категории</h3>
          <ul>
            {categoryWords.map((word, idx) => (
              <li key={`${word.word}-${idx}`}>{word.word} <em>({word.topic})</em></li>
            ))}
          </ul>
        </div>
      )}

      {/* Остальная часть UI: вложенная структура категорий (не обязательно) */}
      {categories.map((cat) => (
        <div key={cat.category} style={{ marginTop: 16 }}>
          <h2>{cat.category}</h2>
          {cat.topics.map((t) => (
            <div key={t.topic} style={{ marginLeft: 16 }}>
              <strong>{t.topic}</strong>
              <ul>
                {t.words.map((w: any) => (
                  <li key={(typeof w === 'string' ? w : w.word) as string}>
                    {typeof w === 'string' ? w : w.word}
                  </li>
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