// CategoryButtons.tsx
'use client';

import React from 'react';
// Импортируем React для создания функционального компонента

import { Button } from '../../shared/ui/Button';
// Импортируем универсальный UI-компонент кнопки из общей библиотеки проекта

import type { ICategory } from '../../api/types';
// Импортируем тип ICategory — описывает структуру категории (например, с полем category)

// Описание пропсов компонента
export type CategoryButtonsProps = {
  categories: ICategory[]; // Массив объектов категорий, которые нужно отобразить
  onSelectCategory?: (category: string) => void; // Опциональный коллбек при выборе категории
};

// Создаем React функциональный компонент с деструктуризацией пропсов
export const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,       // Пропс: массив категорий для рендера кнопок
  onSelectCategory, // Пропс: функция вызова при клике на кнопку категории
}) => {
  return (
    // Контейнер для кнопок, вертикальный список с промежутками
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {
        categories.map((cat) => (
          // Для каждой категории из массива создаем кнопку
          <Button
            key={cat.category}                          // Ключ для оптимизации React (уникальное имя категории)
            onClick={() => onSelectCategory?.(cat.category)} // При клике вызываем функцию выбора категории, передавая ее имя
          >
            {cat.category} {/* Отображаем название категории в кнопке */}
          </Button>
        ))
      }
    </div>
  );
};

// Опциональный дефолтный экспорт для удобного импорта без имен
export default CategoryButtons;