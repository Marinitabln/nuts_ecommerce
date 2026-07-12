import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../uses-case/products-service";


export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};