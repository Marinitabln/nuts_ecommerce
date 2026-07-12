import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../uses-case/categories-service";
import { useToastStore } from "@/stores/ToastStore";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      showToast("Categoría creada correctamente");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Categoría actualizada correctamente");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      showToast("Categoría eliminada correctamente");
    },
  });
};
