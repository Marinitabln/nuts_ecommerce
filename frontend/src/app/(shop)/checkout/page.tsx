"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircleMore } from "lucide-react";

import { useCartStore } from "@/stores/Cart.store";
import { getTokenPayload, TokenPayload } from "@/lib/auth-token";
import { buildWhatsappMessage } from "@/lib/buildWhatsappMessage";
import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const WHATSAPP_PHONE = "5492615546708";

export default function CheckoutPage() {
  const router = useRouter();

  const [user, setUser] = useState<TokenPayload | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  useEffect(() => {
    const payload = getTokenPayload();

    if (!payload) {
      router.replace("/ingresar");
      return;
    }

    setUser(payload);
    setCheckedAuth(true);
  }, [router]);

  const handleWhatsappClick = () => {
    if (!user) return;

    const message = buildWhatsappMessage(user, cart, totalPrice);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  if (!checkedAuth) return null;

  if (cart.length === 0) {
    return (
      <Container>
        <div className="mt-20 mb-20 flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl font-bold text-primary">Finalizar compra</h1>
          <p className="text-gray-500">Todavía no agregaste productos al carrito.</p>
          <Link
            href="/"
            className="bg-primary hover:opacity-90 transition-opacity text-white px-6 py-3 rounded-xl font-semibold"
          >
            Ver productos
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="w-full mt-20 mb-20 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-primary">Finalizar compra</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* CUSTOMER DATA */}
          <div className="rounded-2xl bg-white shadow-sm p-6 flex flex-col gap-3 h-fit">
            <h2 className="font-bold text-lg">Datos del cliente</h2>
            <p>
              <span className="font-medium">Nombre:</span> {user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user?.email}
            </p>
          </div>

          {/* ORDER SUMMARY */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white shadow-sm p-6 flex flex-col gap-4">
              <h2 className="font-bold text-lg">Resumen del pedido</h2>

              <div className="flex flex-col gap-3">
                {cart.map((item) => (
                  <div
                    key={`${item.productId}-${item.presentation.label}`}
                    className="flex items-center justify-between border-b border-secondary pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">
                        {item.presentation.label} x{item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-primary">${item.subtotal}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={handleWhatsappClick}
                className="flex items-center justify-center gap-2"
              >
                <MessageCircleMore size={18} />
                Pagar por WhatsApp
              </Button>

              <Button variant="outline" onClick={() => router.back()}>
                Seguir comprando
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
