import type { Rejection } from './rules';

const quote = (text: string) => `«${text.toLocaleUpperCase('es')}»`;

export const getRejectionMessage = (rejection: Rejection): string => {
  switch (rejection.reason) {
    case 'empty':
      return 'Escribí una palabra para continuar.';
    case 'invalid-format':
      return 'Usá una sola palabra, solo con letras (sin espacios, números ni símbolos).';
    case 'already-used':
      return `${quote(rejection.word)} ya fue utilizada en esta partida.`;
    case 'wrong-start':
      return `${quote(rejection.word)} no respeta la cadena: tiene que empezar con ${quote(rejection.expectedLetter)}.`;
    case 'not-found':
      return `${quote(rejection.word)} no existe en el diccionario.`;
    case 'unavailable':
      return rejection.message;
  }
};
