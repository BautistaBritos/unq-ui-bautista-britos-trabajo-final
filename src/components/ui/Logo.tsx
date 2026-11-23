import { Link2 } from 'lucide-react';
import styles from './Logo.module.css';

export const Logo = () => (
  <div className={styles.logo}>
    <span className={styles.mark} aria-hidden="true">
      <Link2 size={24} strokeWidth={2.5} />
    </span>
    <span className={styles.name}>
      Palabras <span className={styles.accent}>Encadenadas</span>
    </span>
  </div>
);
