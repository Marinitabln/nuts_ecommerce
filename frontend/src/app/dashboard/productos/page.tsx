"use client";

import { useState } from "react";

import Image from "next/image";

import {
  Pencil,
  Trash2,
  Plus,
  Search,
  PackageCheck,
  PackageX,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

import { useGetProducts } from "@/services/query-services/products-query";

import { ProductType } from "@/types/product.types";
import MobileCard from "@/components/dashboard/products/MobileCard";
import TableProducts from "@/components/dashboard/products/TableProducts";
import { usePagination } from "@/hooks/usePagination";
import PaginationControls from "@/components/ui/PaginationControls";
import ProductFormModal from "@/components/dashboard/products/ProductFormModal";
import { useDeleteProduct } from "@/services/mutations-service/products-mutation";

const ITEMS_PER_PAGE = 5;

export default function DashboardProductsPage() {
  const { data: products, isLoading } = useGetProducts();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);

  const deleteProduct = useDeleteProduct();

  const categories = [
    "all",
    ...new Set(
      products?.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts =
    products?.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all"
          ? true
          : product.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }) || [];

  const {
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = usePagination(
    filteredProducts,
    ITEMS_PER_PAGE
  );

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: ProductType) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Seguro que querés eliminar este producto?")) return;
    deleteProduct.mutate(id);
  };

  const getTotalStock = (
    product: ProductType
  ) => {
    return (
      product.presentations?.reduce(
        (acc, presentation) =>
          acc + (presentation.stock || 0),
        0
      ) || 0
    );
  };

  return (
    <section className="w-full flex flex-col gap-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-primary">
            Productos
          </h1>

          <p className="text-gray-500 mt-1">
            Gestioná productos,
            precios y stock
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleCreate}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Nuevo producto
        </Button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* SEARCH */}
        <div className="relative w-full md:max-w-sm">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className=" w-full rounded-xl border border-gray-200 bg-white py-3 pl-10  pr-4 outline-none focus:border-primary"
          />
        </div>

        {/* CATEGORY */}
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category === "all"
                ? "Todas las categorías"
                : category}
            </option>
          ))}
        </select>
      </div>

      {/* MOBILE CARD */}
      <MobileCard
        products={currentItems}
        getTotalStock={getTotalStock}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* TABLE */}
      <TableProducts
        products={currentItems}
        getTotalStock={getTotalStock}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />

      <PaginationControls prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} totalPages={totalPages} />

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        product={editingProduct}
      />
    </section>
  );
}