import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Panel } from '../components/ui/Panel';
import styles from './GameScreen.module.css';

interface GameScreenProps {
  onExit: () => void;
}

// Esqueleto de la pantalla de partida: el juego se arma en los próximos pasos.
export const GameScreen = ({ onExit }: GameScreenProps) => (
  <section className={styles.screen} aria-labelledby="game-title">
    <Panel className={styles.placeholder}>
      <Construction size={52} className={styles.icon} aria-hidden="true" />
      <h2 id="game-title" className={styles.title}>
        Partida en construcción
      </h2>
      <p className={styles.text}>Acá van a estar el reloj, el puntaje, el input y la cadena de palabras.</p>
      <Button variant="secondary" startIcon={<ArrowLeft size={18} />} onClick={onExit}>
        Volver al inicio
      </Button>
    </Panel>
  </section>
);
