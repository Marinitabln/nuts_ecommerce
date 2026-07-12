"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { CategoryType } from "@/types/product.types";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/services/mutations-service/categories-mutation";
import { getApiErrorMessage } from "@/lib/api-error";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: CategoryType | null;
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  category,
}: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const isSaving = createCategory.isPending || updateCategory.isPending;

  useEffect(() => {
    setName(category?.name ?? "");
    setError("");
  }, [category, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (category) {
        await updateCategory.mutateAsync({ id: category.id, name });
      } else {
        await createCategory.mutateAsync(name);
      }

      onClose();
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          category
            ? "No se pudo actualizar la categoría."
            : "No se pudo crear la categoría."
        )
      );
    }
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />

      <div
        className="
          fixed left-1/2 top-1/2 z-50
          w-[90%] max-w-md
          -translate-x-1/2 -translate-y-1/2
          rounded-2xl bg-white shadow-2xl overflow-hidden
        "
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold">
            {category ? "Editar categoría" : "Nueva categoría"}
          </h2>

          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Nombre</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Endulzantes"
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border px-5 py-3 font-medium disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-primary px-5 py-3 font-medium text-white disabled:opacity-50"
            >
              {isSaving ? "Guardando..." : category ? "Guardar cambios" : "Crear categoría"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
