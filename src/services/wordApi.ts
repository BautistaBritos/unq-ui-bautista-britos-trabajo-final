import axios from 'axios';

const api = axios.create({
  baseURL: 'https://word-api-hmlg.vercel.app',
  timeout: 8000,
});

interface ValidateResponse {
  exists: boolean;
}

export const checkWordExists = async (word: string): Promise<boolean> => {
  const response = await api.get<ValidateResponse>('/api/validate', { params: { word } });
  return response.data.exists === true;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') return 'El diccionario tardó demasiado en responder. Probá de nuevo.';
    if (!error.response) return 'No se pudo conectar con el diccionario. Revisá tu conexión y probá de nuevo.';
    return 'El diccionario no está disponible en este momento. Probá de nuevo.';
  }
  return 'No se pudo validar la palabra. Probá de nuevo.';
};
