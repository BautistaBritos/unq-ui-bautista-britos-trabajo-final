import { useCallback, useEffect, useRef, useState } from 'react';
import { getRejectionMessage } from '../game/messages';
import { getNextLetter, TURN_SECONDS, validateWord } from '../game/rules';
import { getChainScore } from '../game/words';

export type GameStatus = 'ready' | 'playing' | 'finished';

const TICK_MS = 200;

const getSecondsLeft = (deadline: number) => Math.max(0, Math.ceil((deadline - Date.now()) / 1000));

export const useGame = () => {
  const [status, setStatus] = useState<GameStatus>('ready');
  const [chain, setChain] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(TURN_SECONDS);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deadlineRef = useRef(0);
  const isValidatingRef = useRef(false);
  const gameIdRef = useRef(0);

  // El contador corre desde la primera palabra válida hasta llegar a 0.
  useEffect(() => {
    if (status !== 'playing') return;

    const intervalId = setInterval(() => {
      const secondsLeft = getSecondsLeft(deadlineRef.current);
      setTimeLeft(secondsLeft);
      if (secondsLeft === 0) setStatus('finished');
    }, TICK_MS);

    return () => clearInterval(intervalId);
  }, [status]);

  // Devuelve true si la palabra se agregó a la cadena.
  const submitWord = useCallback(
    async (input: string): Promise<boolean> => {
      if (status === 'finished' || isValidatingRef.current) return false;

      isValidatingRef.current = true;
      setIsValidating(true);
      setError(null);

      const gameId = gameIdRef.current;
      const result = await validateWord(input, chain);

      isValidatingRef.current = false;
      setIsValidating(false);

      const timeIsUp = status === 'playing' && getSecondsLeft(deadlineRef.current) === 0;
      if (gameId !== gameIdRef.current || timeIsUp) return false;

      if (!result.valid) {
        setError(getRejectionMessage(result.rejection));
        return false;
      }

      deadlineRef.current = Date.now() + TURN_SECONDS * 1000;
      setChain((previous) => [...previous, result.word]);
      setTimeLeft(TURN_SECONDS);
      setStatus('playing');
      return true;
    },
    [status, chain]
  );

  const clearError = useCallback(() => setError(null), []);

  const restart = useCallback(() => {
    gameIdRef.current += 1;
    isValidatingRef.current = false;
    setStatus('ready');
    setChain([]);
    setTimeLeft(TURN_SECONDS);
    setIsValidating(false);
    setError(null);
  }, []);

  return {
    status,
    chain,
    score: getChainScore(chain),
    nextLetter: getNextLetter(chain),
    timeLeft,
    isValidating,
    error,
    submitWord,
    clearError,
    restart,
  };
};
