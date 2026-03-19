'use client';

import React, { useContext, useEffect, useState } from 'react';
// Импортируем React и хуки для работы с состоянием и эффектами

import GameContext from './context/GameContext';
// Импортируем контекст, содержащий глобальное состояние и функцию dispatch

import { fetchCategories } from './services/categoryApi';
// Импортируем функцию для получения категорий с API

import { ICategory, ITopic, IWord } from './api/types';
// Импортируем типы данных (категории, темы и слова)

import CategoryButtons from './components/CategoryButtons';
// Импорт компонента для выбора категории

import TopicButton from './components/TopicButton';

import ShuffledWordsList from './shared/ui/ShuffledWordsList'; 
// Импорт компонента для выбора темы

import { useCategoryWords } from './hooks/useCategoryWords';
// Импорт кастомного хука для получения слов по выбранной категории

import { handleCategorySelect } from '../src/utils/handleCategorySelect';
// Импорт функции обработки выбора категории

const App: React.FC = () => {
  const ctx = useContext(GameContext);
  // Получаем контекст, содержащий состояние и функцию dispatch

    // Выводим текущий стейт в консоль
  useEffect(() => {
    console.log('Текущее состояние стейта:', ctx?.state);
  }, [ctx?.state]);

  if (!ctx) return null;
  // Если контекст отсутствует, возвращаем null (на всякий случай)

  const { state, dispatch } = ctx;
  // Распаковываем из контекста: состояние и функцию dispatch

  const categories = state.categories ?? [];
  // Получаем список всех категорий из глобального состояния (или пустой массив)
  // Источник: `state.categories` из контекста

  const activeCategoryName = state.activeCategory;
  // Получаем название активной выбранной категории из состояния
  // Источник: `state.activeCategory`

  const currentCategory = categories.find(c => c.category === activeCategoryName);
  // Находим объект текущей категории по имени
  // Источник: список `categories`, из состояния

  const categoryWords: IWord[] = useCategoryWords(categories, activeCategoryName);
  // Используем кастомный хук, чтобы получить слова выбранной категории
  // Источник: параметры `categories` и `activeCategoryName`

  // Выводим в консоль полученные слова, если есть активная категория
useEffect(() => {
  if (categoryWords.length > 0) {
    console.log('Полученные слова из контекста для категории:', activeCategoryName);
    console.log(categoryWords);
  } else if (activeCategoryName) {
    console.log('Категория выбрана, но слов не найдено:', activeCategoryName);
  }
}, [categoryWords, activeCategoryName]);

  const [wordIndex, setWordIndex] = useState(0);
  // Локальный локальный стейт, индекс текущего слова в списке

  useEffect(() => {
    // При смене активной категории или списка слов сбрасываем индекс слова
    setWordIndex(0);
  }, [activeCategoryName, categoryWords]);

  useEffect(() => {
    // Каждый раз, когда меняется активная категория, сбрасываем выбранную тему
    console.log('Меняется активная категория, сброс темы');
    dispatch({ type: 'SET_TOPIC', payload: null });
  }, [activeCategoryName, dispatch]);

  useEffect(() => {
    // Загружаем список категорий с сервера при первом рендере
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        // Асинхронный вызов для получения категорий из API
        console.log('Получены категории:', cats);
        dispatch({ type: 'SET_CATEGORIES', payload: cats });
        // Сохраняем полученные категории в глобальном состоянии
      } catch (err) {
        // Обработка ошибок загрузки
        console.error('Ошибка загрузки категорий:', err);
      }
    };
    loadCategories();
  }, [dispatch]);

  if (!categories.length) {
    // Пока список категорий пуст, показываем сообщение о загрузке
    return <div>Загрузка категорий...</div>;
  }

  return (
    <div>
      <h1>Категории</h1>

      {/* Компонент для выбора категории */}
      <CategoryButtons
        categories={categories}
        onSelectCategory={(category) => {
          // Обработчик выбора категории
          handleCategorySelect(category, categories, dispatch);
          console.log('Состояние после выбора категории:', ctx?.state);
          // Передача выбранной категории, список категорий и dispatch
        }}
      />

      {/* Отображение тем выбранной категории */}
      {activeCategoryName && currentCategory && (
  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
    {/* Первый блок с кнопкой темы и списком слов */}
    {currentCategory.topics[0] && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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

    {/* Массив слов по выбранной категории, показанный между кнопками */}
    {categoryWords.length > 0 && (
      <div style={{ paddingLeft: 16 }}>
        <h4>Слова выбранной категории:</h4>
        <ul>
          {categoryWords.map((word, idx) => (
            <li key={`${word.word}-${idx}`}>
              {word.word} <em>({word.topic})</em>
            </li>
          ))}
        </ul>
      </div>
    )}

    <ShuffledWordsList words={categoryWords} />

    {/* Второй блок с кнопкой темы и списком слов */}
    {currentCategory.topics[1] && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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

      {/* Список слов выбранной категории (если есть) */}
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

      {/* Вся сумма всех категорий и тем */}
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