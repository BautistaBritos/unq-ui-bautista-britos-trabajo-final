import { checkWordExists, getErrorMessage } from '../services/wordApi';
import { cleanWord, getFirstLetter, getLastLetter, isSingleWord, toComparable } from './words';

export type Rejection =
  | { reason: 'empty' }
  | { reason: 'invalid-format' }
  | { reason: 'already-used'; word: string }
  | { reason: 'wrong-start'; word: string; expectedLetter: string }
  | { reason: 'not-found'; word: string }
  | { reason: 'unavailable'; message: string };

export type ValidationResult = { valid: true; word: string } | { valid: false; rejection: Rejection };

export const getNextLetter = (chain: string[]): string | null =>
  chain.length > 0 ? getLastLetter(chain[chain.length - 1]) : null;

// Valida que la palabra no esté vacía, no esté repetida y empiece con la letra que corresponde.
export const checkLocalRules = (input: string, chain: string[]): Rejection | null => {
  const word = cleanWord(input);

  if (word === '') return { reason: 'empty' };
  if (!isSingleWord(word)) return { reason: 'invalid-format' };

  const comparable = toComparable(word);
  if (chain.some((usedWord) => toComparable(usedWord) === comparable)) {
    return { reason: 'already-used', word };
  }

  const expectedLetter = getNextLetter(chain);
  if (expectedLetter !== null && getFirstLetter(word) !== expectedLetter) {
    return { reason: 'wrong-start', word, expectedLetter };
  }

  return null;
};

// Primero valida las reglas del juego y recién después consulta si la palabra existe.
export const validateWord = async (input: string, chain: string[]): Promise<ValidationResult> => {
  const localRejection = checkLocalRules(input, chain);
  if (localRejection) return { valid: false, rejection: localRejection };

  const word = cleanWord(input);
  try {
    const exists = await checkWordExists(word);
    return exists ? { valid: true, word } : { valid: false, rejection: { reason: 'not-found', word } };
  } catch (error) {
    return { valid: false, rejection: { reason: 'unavailable', message: getErrorMessage(error) } };
  }
};
