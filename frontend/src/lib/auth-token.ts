const TOKEN_KEY = "nuts_auth_token";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "customer";
}

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getTokenPayload = (): TokenPayload | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};
