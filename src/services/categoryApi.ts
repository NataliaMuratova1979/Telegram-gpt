// src/services/categoryApi.ts
import type { ICategory } from '../api/types';
import { getCategories } from '../api/mockApi';

export async function fetchCategories(): Promise<ICategory[]> {
  // Здесь можно добавить кэширование, перехват ошибок и т. п.
  return getCategories();
}