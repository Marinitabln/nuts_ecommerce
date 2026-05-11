import { ProductType } from "@/types/product.types";
import { api } from "../general_api";


export const getProducts = async (): Promise<ProductType[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (
  id: string
): Promise<ProductType> => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const getProductsByCategory = async (
  category: string
): Promise<ProductType[]> => {  
    const response = await api.get(`/products/category/${category}`);
    return response.data;
}

export const getProductsBySearch = async (
  query: string
): Promise<ProductType[]> => {  

    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
}   

export const updatePrduct = async (id: string, data: Partial<ProductType>): Promise<ProductType> => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
}

export const createProduct = async (data: Omit<ProductType, "id">): Promise<ProductType> => {
  const response = await api.post("/products", data);
  return response.data;
}   

export const deleteProduct = async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);        
}