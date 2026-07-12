"use client";

import { useParams, useRouter } from "next/navigation";
import { Frown } from "lucide-react";

import { useGetProductById } from "@/services/query-services/products-query";
import ProductCardDetail from "@/components/products/ProductCardDetail";
import Container from "@/components/ui/Container";

const DetalleProducto = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: product, isLoading, error } = useGetProductById(id);

  const isUnavailable = error || !product || product.active === false;

  return (
    <Container>
      <div className="w-full mt-20 mb-20">
        <button
          onClick={() => router.back()}
          className="mb-8 font-semibold text-primary hover:text-secondary transition-colors"
        >
          ← Volver
        </button>

        {isLoading && (
          <p className="text-md text-primary text-center py-20">
            Cargando el detalle del producto seleccionado...
          </p>
        )}

        {!isLoading && isUnavailable && (
          <div className="flex flex-col items-center gap-3 text-center py-20">
            <Frown className="text-primary" size={40} />
            <p>
              Hubo un problema al cargar el producto seleccionado.
              <br />
              Por favor, intentá más tarde.
            </p>
          </div>
        )}

        {!isLoading && !isUnavailable && product && (
          <ProductCardDetail {...product} />
        )}
      </div>
    </Container>
  );
};

export default DetalleProducto;
