"use client";

import { Trash2, Minus, Plus } from "lucide-react";
import { CartItemType } from "@/types/product.types";
import { useCartStore } from "@/stores/Cart.store";

interface CartItemProps {
  selectedProduct: CartItemType;
}

const CartItem = ({
  selectedProduct,
}: CartItemProps) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore();

  return (
    <div className="flex gap-4 bg-white shadow-sm rounded-xl p-4 ">

      {/* IMAGE */}
      <img
        src={selectedProduct.imageUrl}
        alt={selectedProduct.productName}
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-tight">
              {selectedProduct.productName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {selectedProduct.presentation.label}
            </p>
          </div>

          <button
            onClick={() =>
              removeFromCart(
                selectedProduct.productId,
                selectedProduct.presentation.label
              )
            }
            className="
              text-gray-400
              hover:text-red-500
              transition-colors
            "
          >
            <Trash2 size={18} />
          </button>
        </div>

     
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3 text-xs border rounded-lg px-1.5 py-1" >
            <button
              onClick={() =>
                decreaseQuantity(
                  selectedProduct.productId,
                  selectedProduct.presentation.label
                )
              }
              className="hover:text-[var(--color-primary)]"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-[20px] text-center">
              {selectedProduct.quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(
                  selectedProduct.productId,
                  selectedProduct.presentation.label
                )
              }
              className="hover:text-[var(--color-primary)]"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* PRICE */}
          <span className="font-bold text-[var(--color-primary)]">
            $
            {selectedProduct.presentation.price *
              selectedProduct.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;