// src/shared/ui/Themes/types.ts

export interface Theme {
  id: number;
  name: string;
};

export interface ThemesProps {
  themes: Theme[];
  onThemeSelect?: (theme: Theme) => void; // при необходимости обработчик
}