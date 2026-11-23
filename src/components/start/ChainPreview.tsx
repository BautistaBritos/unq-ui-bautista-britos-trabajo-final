import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { cx } from '../../utils/classNames';
import styles from './ChainPreview.module.css';

const EXAMPLE_CHAIN = ['casa', 'árbol', 'luna'];
const STAGGER_MS = 180;

export const ChainPreview = () => (
  <ol className={styles.chain} aria-label={`Ejemplo de cadena: ${EXAMPLE_CHAIN.join(', ')}`}>
    {EXAMPLE_CHAIN.map((word, wordIndex) => {
      const letters = Array.from(word.toUpperCase());
      const isFirstWord = wordIndex === 0;
      const isLastWord = wordIndex === EXAMPLE_CHAIN.length - 1;

      return (
        <li key={word} className={styles.item} style={{ '--delay': `${wordIndex * STAGGER_MS}ms` } as CSSProperties}>
          {!isFirstWord && <ArrowRight className={styles.connector} size={28} aria-hidden="true" />}
          <span className={styles.word} aria-hidden="true">
            {letters.map((letter, letterIndex) => {
              const linksWithPrevious = !isFirstWord && letterIndex === 0;
              const linksWithNext = !isLastWord && letterIndex === letters.length - 1;
              return (
                <span key={letterIndex} className={cx(styles.letter, (linksWithPrevious || linksWithNext) && styles.link)}>
                  {letter}
                </span>
              );
            })}
          </span>
        </li>
      );
    })}
  </ol>
);
