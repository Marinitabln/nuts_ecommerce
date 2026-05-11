import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../uses-case/products-service";


export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};