import type { ReactNode } from 'react';
import { Logo } from '../ui/Logo';
import { cx } from '../../utils/classNames';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className={styles.app}>
    <div className={styles.background} aria-hidden="true">
      <span className={cx(styles.orb, styles.orbPink)} />
      <span className={cx(styles.orb, styles.orbPurple)} />
    </div>

    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Logo />
      </div>
    </header>

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>Trabajo Final Integrador · Interfaces de Usuario · UNQ</footer>
  </div>
);
