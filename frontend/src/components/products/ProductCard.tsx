"use client";

import { useEffect, useState } from "react";
import { CartItemType, ProductType } from "@/types/product.types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { MinusCircle, PlusCircle } from "lucide-react"
import Image from "next/image";
import { useCartStore } from "@/stores/Cart.store";
import { useToastStore } from "@/stores/ToastStore";

const ProductCard = ({
  id,
  imageUrl,
  name,
  presentations,
}: ProductType) => {

  const [quantity, setQuantity] = useState(1);
  const [selectedPresentation, setSelectedPresentation] = useState(presentations[0]);
  const [subtotal, setSubtotal] = useState(presentations[0].finalPrice);

  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);

  const router = useRouter();

  const presentationId = `presentation-${id}`;

  const decreaseQuantity = () => {
    setQuantity((quantity) =>
      Math.max(1, quantity - 1)
    );
  };

  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handlePresentation = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = presentations.find(
      (presentation) =>
        presentation.label ===
        e.target.value
    );

    if (selected) {
      setSelectedPresentation(selected);
    }
  };

  const handleProductToCart = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const cartItem: CartItemType = {
      productId: id,

      productName: name,

      imageUrl,

      presentation: {
        label:
          selectedPresentation.label,

        finalPrice:
          selectedPresentation.finalPrice,
      },

      subtotal,
      quantity,
    };

    addToCart(cartItem);
    showToast(`Se agregó ${name} al carrito`);
    setQuantity(1);
  };

  const handleDetail = () => {
    router.push(`/producto/${id}`);
  };

  useEffect(() => {
    setSubtotal(
      quantity *
      selectedPresentation.finalPrice
    );
  }, [
    quantity,
    selectedPresentation.finalPrice,
  ]);

  return (
    <div className="group rounded-lg w-full max-w-[280px] h-full p-6 mx-auto flex flex-col shadow-[1px_3px_5px_rgba(0,0,0,0.15)] hover:bg-[#eeeeee] transition-all duration-500">

      <div className="overflow-hidden rounded-lg">
        <Image
          width={300}
          height={200}
          src={imageUrl}
          alt={name}
          className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      
        <h2 className="text-md mb-4 font-bold border-b border-[#ddd] py-3 line-clamp-2">
          {name}
        </h2>

      <form
        onSubmit={handleProductToCart}
      >
        <div className="flex items-center gap-3 mb-4">
          <label htmlFor={presentationId}>Tamaño:</label>

          <select
            name="presentation"
            id={presentationId}
            onChange={handlePresentation}
            className="w-full p-2 rounded border border-[var(--color-border)]"
          >
            {presentations.map(
              (presentation) => (
                <option
                  key={
                    presentation.label
                  }
                  value={
                    presentation.label
                  }
                >
                  {presentation.label}
                </option>
              )
            )}
          </select>
        </div>

        <span className="text-[1.3rem] font-bold text-[var(--color-primary)] pb-4 block">
          ${selectedPresentation.finalPrice}
        </span>

        <div className="flex justify-start items-baseline gap-4">
          <span className="w-[30%] flex justify-between items-center gap-1 text-[1.2rem] mb-4">
            <MinusCircle onClick={decreaseQuantity} className="cursor-pointer" />
            <span>{quantity}</span>
            <PlusCircle onClick={increaseQuantity} className="cursor-pointer" />
          </span>

          {quantity > 1 && (
            <span>
              Subtotal: ${subtotal}
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-2">

          <Button
            type="submit"
            variant="primary"
          >
            Agregar al carrito
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleDetail}
          >
            Ver detalle
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductCard;