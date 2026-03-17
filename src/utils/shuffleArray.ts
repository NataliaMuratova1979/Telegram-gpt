// src/utils/helpers.ts

/**
 * Перемешивает массив случайным образом и возвращает новый массив.
 * @param array - Исходный массив
 * @returns Новый перемешанный массив
 */

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}