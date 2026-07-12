"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MinusCircle, PlusCircle } from "lucide-react";

import { CartItemType, ProductType } from "@/types/product.types";
import { useCartStore } from "@/stores/Cart.store";
import { useToastStore } from "@/stores/ToastStore";
import { Button } from "@/components/ui/Button";

const ProductCardDetail = ({
  id,
  name,
  description,
  imageUrl,
  presentations,
}: ProductType) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedPresentation, setSelectedPresentation] = useState(
    presentations[0]
  );
  const [subtotal, setSubtotal] = useState(presentations[0].finalPrice);

  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);

  const presentationId = `presentation-${id}`;

  const decreaseQuantity = () => {
    setQuantity((quantity) => Math.max(1, quantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handlePresentation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = presentations.find(
      (presentation) => presentation.label === e.target.value
    );

    if (selected) {
      setSelectedPresentation(selected);
    }
  };

  const handleProductToCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cartItem: CartItemType = {
      productId: id,
      productName: name,
      imageUrl,

      presentation: {
        label: selectedPresentation.label,
        finalPrice: selectedPresentation.finalPrice,
      },

      subtotal,
      quantity,
    };

    addToCart(cartItem);
    showToast(`Se agregó ${name} al carrito`);
    setQuantity(1);
  };

  useEffect(() => {
    setSubtotal(quantity * selectedPresentation.finalPrice);
  }, [quantity, selectedPresentation.finalPrice]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-10">
      {/* IMAGE */}
      <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-[1px_3px_5px_rgba(0,0,0,0.15)]">
        <Image
          width={600}
          height={500}
          src={imageUrl}
          alt={name}
          className="w-full h-[320px] md:h-[420px] object-cover"
        />
      </div>

      {/* INFO */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-bold border-b border-[#ddd] pb-4">
          {name}
        </h1>

        {description && (
          <p className="leading-8 text-gray-600">{description}</p>
        )}

        <form onSubmit={handleProductToCart} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <label htmlFor={presentationId} className="font-medium">
              Tamaño:
            </label>

            <select
              name="presentation"
              id={presentationId}
              onChange={handlePresentation}
              className="w-full p-2 rounded border border-[var(--color-border)]"
            >
              {presentations.map((presentation) => (
                <option key={presentation.label} value={presentation.label}>
                  {presentation.label}
                </option>
              ))}
            </select>
          </div>

          <span className="text-[1.6rem] font-bold text-[var(--color-primary)]">
            ${selectedPresentation.finalPrice}
          </span>

          <div className="flex items-baseline gap-4">
            <span className="flex items-center gap-3 text-[1.2rem]">
              <MinusCircle onClick={decreaseQuantity} className="cursor-pointer" />
              <span>{quantity}</span>
              <PlusCircle onClick={increaseQuantity} className="cursor-pointer" />
            </span>

            {quantity > 1 && <span>Subtotal: ${subtotal}</span>}
          </div>

          <Button type="submit" variant="primary" className="w-full md:w-auto">
            Agregar al carrito
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductCardDetail;
