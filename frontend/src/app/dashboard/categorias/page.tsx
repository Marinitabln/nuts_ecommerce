"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Tags, Trash2 } from "lucide-react";

import { useGetProducts } from "@/services/query-services/products-query";
import { useGetCategories } from "@/services/query-services/categories-query";
import { useDeleteCategory } from "@/services/mutations-service/categories-mutation";
import { slugify } from "@/lib/slugify";
import { getApiErrorMessage } from "@/lib/api-error";
import { Button } from "@/components/ui/Button";
import CategoryFormModal from "@/components/dashboard/categories/CategoryFormModal";
import { CategoryType } from "@/types/product.types";

export default function CategoriasPage() {
  const { data: products = [] } = useGetProducts();
  const { data: categories = [], isLoading } = useGetCategories();

  const deleteCategory = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null);

  const statsByCategory = new Map<string, { count: number; stock: number }>();

  products.forEach((product) => {
    const current = statsByCategory.get(product.category) ?? { count: 0, stock: 0 };

    const stock = product.presentations?.reduce(
      (acc, presentation) => acc + (presentation.stock || 0),
      0
    ) ?? 0;

    statsByCategory.set(product.category, {
      count: current.count + 1,
      stock: current.stock + stock,
    });
  });

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: CategoryType) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (category: CategoryType) => {
    if (!confirm(`¿Seguro que querés eliminar "${category.name}"?`)) return;

    deleteCategory.mutate(category.id, {
      onError: (err) => {
        alert(getApiErrorMessage(err, "No se pudo eliminar la categoría."));
      },
    });
  };

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Categorías</h1>
          <p className="text-gray-500 mt-1">Gestioná las categorías del catálogo</p>
        </div>

        <Button variant="primary" onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={18} />
          Nueva categoría
        </Button>
      </div>

      {isLoading && <p className="text-primary">Cargando categorías...</p>}

      {!isLoading && categories.length === 0 && (
        <p className="text-gray-500">Todavía no hay categorías cargadas.</p>
      )}

      {!isLoading && categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const stats = statsByCategory.get(category.name) ?? { count: 0, stock: 0 };

            return (
              <div
                key={category.id}
                className="rounded-2xl bg-white shadow-sm p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Tags size={20} />
                    </div>
                    <h3 className="font-bold text-lg capitalize">{category.name}</h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 rounded-lg text-primary hover:bg-gray-100 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(category)}
                      className="p-2 rounded-lg text-error hover:bg-error/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>
                    {stats.count} producto{stats.count !== 1 ? "s" : ""}
                  </span>
                  <span>{stats.stock} en stock</span>
                </div>

                <Link
                  href={`/categoria/${slugify(category.name)}`}
                  target="_blank"
                  className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                  Ver en la tienda →
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
      />
    </section>
  );
}
