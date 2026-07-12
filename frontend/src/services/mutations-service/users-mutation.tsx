import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserRole, deleteUser } from "../uses-case/users-service";
import { useToastStore } from "@/stores/ToastStore";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: "admin" | "customer" }) =>
      updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showToast("Rol actualizado correctamente");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showToast("Usuario eliminado correctamente");
    },
  });
};
