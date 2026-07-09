import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createProduct,
  updatePrduct,
  deleteProduct,
} from "../uses-case/products-service";
import { useToastStore } from "@/stores/ToastStore";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Producto creado correctamente");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updatePrduct>[1] }) =>
      updatePrduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Producto actualizado correctamente");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Producto eliminado correctamente");
    },
  });
};
