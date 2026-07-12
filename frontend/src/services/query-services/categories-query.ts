import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../uses-case/categories-service";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
