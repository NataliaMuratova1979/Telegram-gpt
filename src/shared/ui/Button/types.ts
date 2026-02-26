// types.ts

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large' | string;
  variant?: 'default' | 'outline' | 'text' | string;
  style?: React.CSSProperties;
  htmlType?: 'button' | 'submit' | 'reset'; // стандарт HTML
  purpose?: string; // тип размечен как string, если нужно
  index?: number;
}