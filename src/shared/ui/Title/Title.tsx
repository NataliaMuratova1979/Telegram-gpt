import type { ITitleProps } from './types';
import styles from './title.module.css';

export function Title({
  as: Tag,
  className,
  children,
  ...rest
}: ITitleProps) {
  const titleClasses = [styles.title, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={titleClasses} {...rest}>
      {children}
    </Tag>
  );
}