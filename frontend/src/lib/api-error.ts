import axios from "axios";

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "No se pudo conectar con el servidor. Intentá de nuevo en unos minutos.";
    }

    return error.response.data?.message || fallback;
  }

  return fallback;
};
