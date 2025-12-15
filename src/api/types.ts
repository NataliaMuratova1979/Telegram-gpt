// types.ts
export interface IWord {
  id: number;
  word: string;
  yes: boolean;
  length: 'короткое' | 'среднее' | 'длинное';
}

export interface ITopic {
  topic: string;
  words: IWord[];
}