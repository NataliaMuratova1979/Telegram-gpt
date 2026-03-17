'use client';

import React, { useContext, useEffect, useState } from 'react';
import GameContext from './context/GameContext';
import { fetchCategories } from './services/categoryApi';
import { ICategory, ITopic, IWord } from './api/types';
import CategoryButtons from './components/CategoryButtons';
import TopicButton from './components/TopicButton';
import { useCategoryWords } from './hooks/useCategoryWords';

const App: React.FC = () => {
  const ctx = useContext(GameContext);
  if (!ctx) return null;
  const { state, dispatch } = ctx;

  const categories = state.categories ?? [];
  const activeCategoryName = state.activeCategory;
  const currentCategory = categories.find(c => c.category === activeCategoryName);

  const categoryWords: IWord[] = useCategoryWords(categories, activeCategoryName);

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setWordIndex(0);
  }, [activeCategoryName, categoryWords]);

  useEffect(() => {
    console.log('Меняется активная категория, сброс темы');
    dispatch({ type: 'SET_TOPIC', payload: null });
  }, [activeCategoryName, dispatch]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        console.log('Получены категории:', cats);
        dispatch({ type: 'SET_CATEGORIES', payload: cats });
      } catch (err) {
        // обработка ошибок
      }
    };
    loadCategories();
  }, [dispatch]);

  if (!categories.length) {
    return <div>Загрузка категорий...</div>;
  }

  return (
    <div>
      <h1>Категории</h1>
      {/* выбор категории */}
      <CategoryButtons
        categories={categories}
        onSelectCategory={(category) => {
          console.log('Выбор категории:', category);
          dispatch({ type: 'SET_CATEGORY', payload: category });
          
          const selectedCategory = categories.find(c => c.category === category);
          if (selectedCategory && selectedCategory.topics.length > 0) {
            const firstTopic = selectedCategory.topics[0].topic;
            dispatch({ type: 'SET_TOPIC', payload: firstTopic });
            
            // Собираем все слова из обеих тем и отмечаем к какой теме относятся
            const allWordsWithTopic: IWord[] = selectedCategory.topics.flatMap(t => 
              t.words.map(w => ({ ...w, topic: t.topic }))
            );
            // Логируем все слова
            console.log('Все слова из категории по обеим темам:', allWordsWithTopic);
            // Загружаем в стейт
            dispatch({ type: 'SET_CATEGORY_WORDS', payload: allWordsWithTopic });
          } else {
            dispatch({ type: 'SET_CATEGORY_WORDS', payload: [] });
          }
        }}
      />

      {/* отображение тем при выбранной категории */}
      {activeCategoryName && currentCategory && (
        <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
          {currentCategory.topics[0] && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TopicButton
                topic={currentCategory.topics[0].topic}
                onSelect={(name) => {
                  console.log('Выбор темы:', name);
                  dispatch({ type: 'SET_TOPIC', payload: name });
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
          {currentCategory.topics[1] && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TopicButton
                topic={currentCategory.topics[1].topic}
                onSelect={(name) => {
                  console.log('Выбор темы:', name);
                  dispatch({ type: 'SET_TOPIC', payload: name });
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

      {/* список слов по выбранной категории и теме */}
      {categoryWords.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h3>Слова выбранной категории</h3>
          <ul>
            {categoryWords.map((word, idx) => (
              <li key={`${word.word}-${idx}`}>
                {word.word} <em>({word.topic})</em>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* все категории и темы */}
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