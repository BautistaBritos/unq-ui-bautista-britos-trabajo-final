import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ChainPreview } from '../components/start/ChainPreview';
import { RulesList } from '../components/start/RulesList';
import styles from './StartScreen.module.css';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => (
  <section className={styles.screen} aria-labelledby="start-title">
    <div className={styles.hero}>
      <span className={styles.badge}>
        <Sparkles size={16} aria-hidden="true" />
        Juego de palabras
      </span>

      <h1 id="start-title" className={styles.title}>
        <span>Palabras</span>
        <span className={styles.titleAccent}>Encadenadas</span>
      </h1>

      <p className={styles.subtitle}>Formá la cadena de palabras más larga antes de que se agote el tiempo.</p>

      <ChainPreview />

      <Button size="lg" endIcon={<ArrowRight size={24} />} onClick={onStart} className={styles.startButton}>
        Jugar
      </Button>
    </div>

    <RulesList />
  </section>
);
