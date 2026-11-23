import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, RotateCcw, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Panel } from '../components/ui/Panel';
import { useGame } from '../hooks/useGame';
import styles from './GameScreen.module.css';

interface GameScreenProps {
  onExit: () => void;
}

export const GameScreen = ({ onExit }: GameScreenProps) => {
  const { status, chain, score, nextLetter, timeLeft, isValidating, error, submitWord, clearError, restart } =
    useGame();
  const [word, setWord] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  const handleChange = (value: string) => {
    setWord(value);
    clearError();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accepted = await submitWord(word);
    if (accepted) setWord('');
    inputRef.current?.focus();
  };

  const handleRestart = () => {
    setWord('');
    restart();
  };

  if (status === 'finished') {
    return (
      <section className={styles.screen} aria-labelledby="game-title">
        <Panel className={styles.panel}>
          <h2 id="game-title" className={styles.title}>
            ¡Se terminó el tiempo!
          </h2>
          <p>Palabras encadenadas: {chain.length}</p>
          <p>Puntaje final: {score}</p>
          <div className={styles.actions}>
            <Button startIcon={<RotateCcw size={18} />} onClick={handleRestart}>
              Jugar de nuevo
            </Button>
            <Button variant="secondary" startIcon={<ArrowLeft size={18} />} onClick={onExit}>
              Volver al inicio
            </Button>
          </div>
        </Panel>
      </section>
    );
  }

  return (
    <section className={styles.screen} aria-labelledby="game-title">
      <Panel className={styles.panel}>
        <h2 id="game-title" className={styles.title}>
          {nextLetter ? `Empezá con «${nextLetter.toLocaleUpperCase('es')}»` : 'Escribí cualquier palabra'}
        </h2>

        <div className={styles.stats}>
          <p>Tiempo: {status === 'ready' ? 'arranca con tu primera palabra' : `${timeLeft} s`}</p>
          <p>Puntaje: {score}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className={styles.input}
            value={word}
            onChange={(event) => handleChange(event.target.value)}
            placeholder="Escribí una palabra..."
            aria-label="Palabra"
            autoComplete="off"
            spellCheck={false}
          />
          <Button type="submit" endIcon={<Send size={18} />} disabled={isValidating || word.trim() === ''}>
            {isValidating ? 'Validando...' : 'Enviar'}
          </Button>
        </form>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <ol className={styles.chain} aria-label="Cadena de palabras">
          {chain.map((chainWord) => (
            <li key={chainWord} className={styles.word}>
              {chainWord}
            </li>
          ))}
        </ol>
      </Panel>
    </section>
  );
};
