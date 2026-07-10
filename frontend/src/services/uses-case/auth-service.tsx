import { api } from "../general_api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};
