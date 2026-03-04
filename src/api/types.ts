export interface IWord {
  word: string;
}

export interface ITopic {
  topic: string;
  words: IWord[];
}

export interface ICategory {
  category: string;
  topics: ITopic[];
}