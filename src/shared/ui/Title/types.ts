import { HTMLAttributes } from 'react';

export type TitleTag = 'h1' | 'h2' | 'h3' | 'h4';

export interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as: TitleTag;
  // size убран
}