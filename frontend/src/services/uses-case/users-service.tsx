import { AuthUser } from "./auth-service";
import { api } from "../general_api";

export const getUsers = async (): Promise<AuthUser[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const updateUserRole = async (
  id: string,
  role: "admin" | "customer"
): Promise<AuthUser> => {
  const response = await api.put(`/users/${encodeURIComponent(id)}/role`, { role });
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${encodeURIComponent(id)}`);
};
