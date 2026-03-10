// src/utils/shuffle.ts
/**
 * Перемешивание массива (алгоритм Фишера-Йейтса)
 * @param array - исходный массив
 * @returns перемешанный новый массив
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]; // Создаем копию массива, чтобы не мутировать оригинал
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс
    [arr[i], arr[j]] = [arr[j], arr[i]]; // обмен элементов
  }
  return arr; // возвращаем перемешанный массив
}