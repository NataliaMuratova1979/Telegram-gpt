/*
export interface IWord {
  word: string;
  // добавьте по необходимости еще свойства
  topic?: string; // теперь можно добавлять тему
}

export interface ITopic {
  topic: string;
  words: IWord[];
}

export interface ICategory {
  category: string;
  topics: ITopic[];
} */

type IWordItem = { word: string };
type ITopic = { topic: string; words: IWordItem[] };
type ICategory = { category: string; topics: ITopic[] };

const data: ICategory[] = [ /* ваши данные */ ];