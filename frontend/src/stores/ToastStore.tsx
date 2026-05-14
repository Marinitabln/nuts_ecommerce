import { create } from "zustand";

interface ToastState {
  message: string;
  visible: boolean;

  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useToastStore =
  create<ToastState>((set) => ({
    message: "",
    visible: false,

    showToast: (message) => {
      set({
        message,
        visible: true,
      });

      setTimeout(() => {
        set({
          visible: false,
        });
      }, 2500);
    },

    hideToast: () =>
      set({ visible: false }),
  }));