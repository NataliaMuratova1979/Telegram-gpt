// types.ts
export type TextPurpose = 'button' | 'link' | 'checkbox';

export interface StyledTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  purpose?: TextPurpose;
}