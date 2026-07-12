"use client";

import Link from "next/link";
import { AlertTriangle, Package, PackageMinus, ShoppingBag, Users } from "lucide-react";

import { KpiCard } from "@/components/dashboard/KpiCard";
import { useGetProducts } from "@/services/query-services/products-query";
import { ProductType } from "@/types/product.types";

const LOW_STOCK_THRESHOLD = 5;

const getLowStockPresentations = (product: ProductType) =>
  product.presentations?.filter((presentation) => (presentation.stock ?? 0) <= LOW_STOCK_THRESHOLD) ?? [];

const getCreatedAtMs = (createdAt: unknown): number => {
  if (!createdAt) return 0;
  if (typeof createdAt === "string") return new Date(createdAt).getTime();
  if (typeof createdAt === "object" && "_seconds" in createdAt) {
    return (createdAt as { _seconds: number })._seconds * 1000;
  }
  return 0;
};

export default function DashboardPage() {
  const { data: products = [] } = useGetProducts();

  const lowStockProducts = products
    .filter((product) => getLowStockPresentations(product).length > 0)
    .sort((a, b) => {
      const minA = Math.min(...getLowStockPresentations(a).map((p) => p.stock ?? 0));
      const minB = Math.min(...getLowStockPresentations(b).map((p) => p.stock ?? 0));
      return minA - minB;
    });

  const recentProducts = [...products]
    .sort((a, b) => getCreatedAtMs(b.createdAt) - getCreatedAtMs(a.createdAt))
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
        <KpiCard
          title="Total de Ventas"
          metric={{ value: 2684, changePercent: 12.5, trend: "up" }}
          color="primary"
          icon={<ShoppingBag />}
        />
        <KpiCard
          title="Total de productos"
          metric={{ value: products.length, changePercent: 12.5, trend: "up" }}
          color="primary"
          icon={<Package />}
        />
        <KpiCard
          title="Total de Clientes"
          metric={{ value: 247, changePercent: 12.5, trend: "up" }}
          color="primary"
          icon={<Users />}
        />
        <KpiCard
          title="Productos bajo stock"
          metric={{ value: lowStockProducts.length, changePercent: 0, trend: "stable" }}
          color="error"
          icon={<PackageMinus />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LOW STOCK */}
        <div className="rounded-2xl bg-white shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Productos con bajo stock</h2>
            <Link
              href="/dashboard/productos"
              className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No hay productos con stock bajo.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {lowStockProducts.slice(0, 5).map((product) => {
                const lowPresentations = getLowStockPresentations(product);

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b border-secondary pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {lowPresentations.map((presentation) => (
                        <span
                          key={presentation.label}
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            (presentation.stock ?? 0) === 0
                              ? "bg-error/10 text-error"
                              : "bg-secondary/40 text-primary"
                          }`}
                        >
                          <AlertTriangle size={14} />
                          {presentation.label}: {presentation.stock ?? 0}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RECENT PRODUCTS */}
        <div className="rounded-2xl bg-white shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Últimos productos agregados</h2>
            <Link
              href="/dashboard/productos"
              className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          {recentProducts.length === 0 ? (
            <p className="text-sm text-gray-500">Todavía no hay productos cargados.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b border-secondary pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                  </div>

                  <span className="text-sm font-semibold text-primary">
                    ${product.presentations?.[0]?.finalPrice ?? "-"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
