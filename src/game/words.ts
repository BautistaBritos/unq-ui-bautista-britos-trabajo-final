const COMBINING_MARKS = /[̀-ͯ]/g;
const N_WITH_TILDE = /ñ/g;
const ONLY_LETTERS = /^[a-záéíóúüñ]+$/u;

export const cleanWord = (input: string): string => input.trim().normalize('NFC').toLocaleLowerCase('es');

export const isSingleWord = (word: string): boolean => ONLY_LETTERS.test(cleanWord(word));

// Pasa la palabra a minúsculas y le saca las tildes, pero deja la ñ.
export const toComparable = (word: string): string =>
  cleanWord(word).normalize('NFD').replace(N_WITH_TILDE, 'ñ').replace(COMBINING_MARKS, '').normalize('NFC');

export const getFirstLetter = (word: string): string => toComparable(word).charAt(0);

export const getLastLetter = (word: string): string => toComparable(word).slice(-1);

export const getWordScore = (word: string): number => Array.from(cleanWord(word)).length;

export const getChainScore = (words: string[]): number =>
  words.reduce((total, word) => total + getWordScore(word), 0);
