import { CartItem } from "@/types/product.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface CartStore {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (
    id: string,
    presentationLabel: string
  ) => void;

  clearCart: () => void;

  increaseQuantity: (
    id: string,
    presentationLabel: string
  ) => void;

  decreaseQuantity: (
    id: string,
    presentationLabel: string
  ) => void;

  getTotalItems: () => number;

  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const existingItem = get().cart.find(
          (cartItem) =>
            cartItem.productId === item.productId &&
            cartItem.presentation.label ===
              item.presentation.label
        );

        if (existingItem) {
          set({
            cart: get().cart.map((cartItem) =>
              cartItem.productId === item.productId &&
              cartItem.presentation.label ===
                item.presentation.label
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  }
                : cartItem
            ),
          });

          return;
        }

        set({
          cart: [...get().cart, item],
        });
      },

      removeFromCart: (id, presentationLabel) => {
        set({
          cart: get().cart.filter(
            (item) =>
              !(
                item.productId === id &&
                item.presentation.label ===
                  presentationLabel
              )
          ),
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      increaseQuantity: (id, presentationLabel) => {
        set({
          cart: get().cart.map((item) =>
            item.productId === id &&
            item.presentation.label === presentationLabel
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        });
      },

      decreaseQuantity: (id, presentationLabel) => {
        set({
          cart: get().cart
            .map((item) =>
              item.productId === id &&
              item.presentation.label ===
                presentationLabel
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      getTotalItems: () => {
        return get().cart.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (acc, item) =>
            acc +
            item.presentation.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);