import React, { useContext, useEffect, useState } from 'react';
import GameContext from './context/GameContext';
import { fetchCategories } from './services/categoryApi';
import { IWord } from './api/types';
import CategoryButtons from './components/CategoryButtons';
import TopicChooser from './components/TopicChooser';
import { useCategoryWords } from './hooks/useCategoryWords';
import { handleCategorySelect } from '../src/utils/handleCategorySelect';
import Modal from './components/Modal';
import BackButton from './shared/ui/BackButton';// по нужному пути

const App: React.FC = () => {
  const ctx = useContext(GameContext);
  useEffect(() => {
    console.log('Текущее состояние стейта:', ctx?.state);
  }, [ctx?.state]);

  if (!ctx) return null;

  const { state, dispatch } = ctx;
  const categories = state.categories ?? [];
  const activeCategoryName = state.activeCategory;
  const currentCategory = categories.find(c => c.category === activeCategoryName);
  const categoryWords: IWord[] = useCategoryWords(categories, activeCategoryName);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (categoryWords.length > 0) {
      console.log('Полученные слова из контекста для категории:', activeCategoryName);
      console.log(categoryWords);
    } else if (activeCategoryName) {
      console.log('Категория выбрана, но слов не найдено:', activeCategoryName);
    }
  }, [categoryWords, activeCategoryName]);

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
        console.error('Ошибка загрузки категорий:', err);
      }
    };
    loadCategories();
  }, [dispatch]);

  if (!categories.length) {
    return <div>Загрузка категорий...</div>;
  }

  // Обработчик выбора категории - открываем модалку
  const onSelectCategory = (category: string) => {
    handleCategorySelect(category, categories, dispatch);
    setIsModalOpen(true); // открыть модальное окно после выбора категории
    console.log('Состояние после выбора категории:', ctx?.state);
  };

  return (
    <div>
      <h1>Выбери тему</h1>

      <CategoryButtons categories={categories} onSelectCategory={onSelectCategory} />

      {/* Показываем модалку с TopicChooser, если она открыта */}
      {isModalOpen && activeCategoryName && currentCategory && categoryWords.length > 0 && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <BackButton onBack={() => setIsModalOpen(false)} />
          <TopicChooser
            topics={[
              currentCategory.topics[0]?.topic ?? 'Тема 1',
              currentCategory.topics[1]?.topic ?? 'Тема 2',
            ]}
            words={categoryWords}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;