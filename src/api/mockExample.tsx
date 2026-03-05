import React, { useEffect, useState } from 'react';
import { Button } from '../shared/ui/Button'; // ваш компонент Button
import { getCategories, getTopics } from './mockApi'; // функции API
import { IWord, ITopic, ICategory } from './types'; // путь к файлу с типами

interface CategoryButtonsProps {
  onCategorySelect: (data: { category: string; topics: ITopic[] }) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [topics, setTopics] = useState<ITopic[] | null>(null);
  const [topicsLoading, setTopicsLoading] = useState(false); // загрузка тем

  useEffect(() => {
    getCategories()
      .then((cats) => {
        setCategories(cats);
        setLoading(false);
      })
      .catch((err) => {
        setError('Ошибка при загрузке категорий');
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setTopics(null);
    setTopicsLoading(true);
    getTopics(category)
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
        setTopicsLoading(false);
        // Передача выбранных данных в родительский компонент
        onCategorySelect({ category, topics: fetchedTopics });
      })
      .catch((err) => {
        console.error('Ошибка при получении тем:', err);
        setError('Ошибка при получении тем');
        setTopicsLoading(false);
      });
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            style={{ margin: '5px' }}
          >
            {category}
          </Button>
        ))}
      </div>

      {selectedCategory && (
        <div style={{ marginTop: '20px' }}>
          <p>Вы выбрали категорию: {selectedCategory}</p>
          {topicsLoading ? (
            <p>Загрузка тем...</p>
          ) : topics ? (
            <ul>
              {topics.map((topic) => (
                <li key={topic.topic}>{topic.topic}</li>
              ))}
            </ul>
          ) : (
            <p>Нет тем для отображения</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryButtons;