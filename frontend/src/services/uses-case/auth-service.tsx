import { api } from "../general_api";

export interface AuthUser {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: "admin" | "customer";
  department?: string;
  location?: string;
  createdAt?: string;
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

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  location: string;
}

export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const getMe = async (): Promise<AuthUser> => {
  const response = await api.get("/auth/me");
  return response.data;
};

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  phone: string;
  department: string;
  location: string;
}

export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<AuthResponse> => {
  const response = await api.put("/auth/me", payload);
  return response.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ message: string }> => {
  const response = await api.put("/auth/me/password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};
