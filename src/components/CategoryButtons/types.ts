import { IWord, ITopic, ICategory } from '../../api/types'; // путь к файлу с типами

export interface CategoryButtonsProps {
  onCategorySelect: (data: { category: string; topics: ITopic[] }) => void;
}