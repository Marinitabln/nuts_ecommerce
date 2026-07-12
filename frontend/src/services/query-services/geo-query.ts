import { useQuery } from "@tanstack/react-query";
import { getDepartamentos, getLocalidades } from "../uses-case/geo-service";

export const useDepartamentos = () => {
  return useQuery({
    queryKey: ["mendoza-departamentos"],
    queryFn: getDepartamentos,
    staleTime: Infinity,
  });
};

export const useLocalidades = (departamento: string) => {
  return useQuery({
    queryKey: ["mendoza-localidades", departamento],
    queryFn: () => getLocalidades(departamento),
    enabled: !!departamento,
    staleTime: Infinity,
  });
};
