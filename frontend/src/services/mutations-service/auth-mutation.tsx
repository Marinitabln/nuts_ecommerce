import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateProfile,
  changePassword,
  UpdateProfilePayload,
} from "../uses-case/auth-service";
import { setToken } from "@/lib/auth-token";
import { useToastStore } from "@/stores/ToastStore";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: ({ token }) => {
      setToken(token);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      showToast("Datos actualizados correctamente");
    },
  });
};

export const useChangePassword = () => {
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => changePassword(currentPassword, newPassword),
    onSuccess: () => {
      showToast("Contraseña actualizada correctamente");
    },
  });
};
