import { CategoryType } from "@/types/product.types";
import { api } from "../general_api";

export const getCategories = async (): Promise<CategoryType[]> => {
  const response = await api.get("/categories");
  return response.data;
};

export const createCategory = async (name: string): Promise<CategoryType> => {
  const response = await api.post("/categories/create", { name });
  return response.data;
};

export const updateCategory = async (
  id: string,
  name: string
): Promise<CategoryType> => {
  const response = await api.put(`/categories/${id}`, { name });
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
