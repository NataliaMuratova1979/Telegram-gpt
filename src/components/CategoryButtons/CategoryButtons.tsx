// CategoryButtons.tsx
'use client';

import React from 'react';
import { Button } from '../../shared/ui/Button'; // используем универсальную кнопку
import type { ICategory } from '../../api/types'; // адаптируйте путь под вашу структуру проекта

// Пропсы компонента: список категорий и коллбек выбора категории
export type CategoryButtonsProps = {
  categories: ICategory[]; // входящие данные: массив категорий с вложенной структурой
  onSelectCategory?: (category: string) => void; // обработчик клика по кнопке
};

// Компонент-контейнер кнопок категорий
export const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {categories.map((cat) => (
        <Button
          key={cat.category}
          onClick={() => onSelectCategory?.(cat.category)} // вызываем коллбек при клике
        >
          {cat.category} {/* текст кнопки: название категории */}
        </Button>
      ))}
    </div>
  );
};

// Опционально: дефолтный экспорт, если нужно использовать без имени
export default CategoryButtons;