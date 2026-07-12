import { CartItemType } from "@/types/product.types";
import { TokenPayload } from "./auth-token";

export const buildWhatsappMessage = (
  user: TokenPayload,
  cart: CartItemType[],
  total: number,
  deliveryInfo: string,
  phone: string
): string => {
  const itemsList = cart
    .map(
      (item) =>
        `- ${item.productName} (${item.presentation.label}) x${item.quantity} — $${item.subtotal}`
    )
    .join("\n");

  return [
    "¡Hola! Quiero hacer un pedido en Nuts.",
    "",
    `Nombre: ${user.name}`,
    `Email: ${user.email}`,
    `Celular: ${phone}`,
    "",
    "Pedido:",
    itemsList,
    "",
    `Total: $${total}`,
    "",
    deliveryInfo,
  ].join("\n");
};
