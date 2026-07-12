"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ShoppingCart, ShoppingBag } from "lucide-react";
import CartItem from "./CartItem";
import { useCartStore } from "@/stores/Cart.store";
import { useHydrated } from "@/hooks/useHydrated";
import { getTokenPayload } from "@/lib/auth-token";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {
  
  const hydrated = useHydrated();
  const router = useRouter();

  const cart = useCartStore(
    (state) => state.cart
  );

  const totalPrice = useCartStore(
    (state) => state.getTotalPrice()
  );

  const handleCheckout = () => {
    onClose();
    router.push(getTokenPayload() ? "/checkout" : "/ingresar");
  };

if (!hydrated) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* DRAWER */}
      <aside
        className={`
          fixed top-0 right-0 h-screen w-full sm:w-[420px]
          bg-white z-50 shadow-2xl
          transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="h-20 border-b px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-primary" />

            <h2 className="text-xl font-semibold">
              Carrito
            </h2>
          </div>

          <button
            onClick={onClose}
            className="hover:opacity-70 transition-opacity"
          >
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingBag className="text-primary" size={28} />
              </div>

              <div>
                <p className="font-semibold">
                  Aún no sumaste productos
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Empezá a comprar y encontrá lo que necesitás
                </p>
              </div>

              <Link
                href="/"
                onClick={onClose}
                className="
                  bg-[var(--color-primary)]
                  text-white
                  px-6 py-3
                  rounded-xl
                  font-semibold
                  hover:opacity-90
                  transition-opacity
                "
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.presentation.label}`}
                  selectedProduct={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="border-t p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="
                w-full
                bg-[var(--color-primary)]
                text-white
                py-3
                rounded-xl
                font-semibold
                hover:opacity-90
                transition-opacity
              "
            >
              Finalizar compra
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
