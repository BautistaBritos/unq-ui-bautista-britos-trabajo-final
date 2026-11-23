import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/classNames';
import styles from './Panel.module.css';

interface PanelProps {
  as?: 'div' | 'section' | 'article' | 'li';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** Tarjeta translúcida sobre el fondo oscuro: la base visual de los bloques del juego. */
export const Panel = ({ as: Component = 'div', className, style, children }: PanelProps) => (
  <Component className={cx(styles.panel, className)} style={style}>
    {children}
  </Component>
);
