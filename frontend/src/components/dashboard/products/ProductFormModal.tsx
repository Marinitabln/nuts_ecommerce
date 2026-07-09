"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { PresentationType, ProductType } from "@/types/product.types";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/services/mutations-service/products-mutation";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductType | null;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  product,
}: ProductFormModalProps) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [presentations, setPresentations] =  useState<PresentationType[]>([]);
  const [error, setError] = useState("");

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const isSaving = createProduct.isPending || updateProduct.isPending;

  useEffect(() => {

    if (product) {

      setName(product.name);

      setDescription(product?.description || "" );

      setCategory(product.category);
      setImageUrl(product.imageUrl);
      setIsActive( product?.active ?? true);

      setPresentations(
        product.presentations || []
      );

    } else {

      setName("");
      setDescription("");
      setCategory("");
      setImageUrl("");
      setIsActive(true);
      setPresentations([
        {
          label: "",
          supplierCost: 0,
          profitMargin: 0,
          finalPrice: 0,
          stock: 0,
        },
      ]);
    }

    setError("");
  }, [product, isOpen]);

  if (!isOpen) return null;

  const addPresentation = () => {

    setPresentations((prev) => [
      ...prev,
      {
        label: "",
        supplierCost: 0,
        profitMargin: 0,
        finalPrice: 0,
        stock: 0,
      },
    ]);
  };

  const removePresentation = (
    index: number
  ) => {

    setPresentations((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  const updatePresentation = (
    index: number,
    field: keyof PresentationType,
    value: string | number
  ) => {

    const updated =
      [...presentations];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    // AUTO CALC FINAL PRICE
    if (
      field === "supplierCost" ||
      field === "profitMargin"
    ) {

      const cost =
        Number(
          updated[index]
            .supplierCost
        ) || 0;

      const margin =
        Number(
          updated[index]
            .profitMargin
        ) || 0;

      updated[index].finalPrice =
        Math.round(
          cost + cost * (margin / 100)
        );
    }

    setPresentations(updated);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();
    setError("");

    const payload = {
      name,
      description,
      category,
      imageUrl,
      active: isActive,
      presentations,
    };

    try {
      if (product) {
        await updateProduct.mutateAsync({ id: product.id, data: payload });
      } else {
        await createProduct.mutateAsync(payload);
      }

      onClose();
    } catch {
      setError(
        product
          ? "No se pudo actualizar el producto. Intentá de nuevo."
          : "No se pudo crear el producto. Intentá de nuevo."
      );
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="
          fixed inset-0
          bg-black/50
          z-50
        "
      />

      {/* MODAL */}
      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-50
          w-[95%]
          max-w-5xl
          -translate-x-1/2
          -translate-y-1/2
          rounded-2xl
          bg-white
          shadow-2xl
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            border-b
            px-6 py-5
          "
        >

          <div>
            <h2 className="text-2xl font-bold">
              {product
                ? "Editar producto"
                : "Nuevo producto"}
            </h2>

            <p className="text-sm text-gray-500">
              Gestioná información,
              precios y stock
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
            "
          >
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit}
          className="
            p-6
            overflow-y-auto
            max-h-[85vh]
            flex flex-col gap-8
          "
        >

          {/* GENERAL */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* NAME */}
            <div className="flex flex-col gap-2">

              <label className="font-medium">
                Nombre
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="
                  rounded-xl
                  border
                  border-gray-200
                  px-4 py-3
                  outline-none
                  focus:border-primary
                "
              />
            </div>

            {/* CATEGORY */}
            <div className="flex flex-col gap-2">

              <label className="font-medium">
                Categoría
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="
                  rounded-xl
                  border
                  border-gray-200
                  px-4 py-3
                  outline-none
                  focus:border-primary
                "
              >
                <option value="">
                  Seleccionar
                </option>

                <option value="cereales">
                  Cereales
                </option>

                <option value="semillas">
                  Semillas
                </option>

                <option value="frutos secos">
                  Frutos secos
                </option>

                <option value="productos envasados">
                  Productos envasados
                </option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">

            <label className="font-medium">
              Descripción
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
                rounded-xl
                border
                border-gray-200
                px-4 py-3
                outline-none
                focus:border-primary
              "
            />
          </div>

          {/* IMAGE */}
          <div className="flex flex-col gap-2">

            <label className="font-medium">
              Imagen URL
            </label>

            <input
              type="text"
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(
                  e.target.value
                )
              }
              className="
                rounded-xl
                border
                border-gray-200
                px-4 py-3
                outline-none
                focus:border-primary
              "
            />
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(
                  e.target.checked
                )
              }
              className="w-5 h-5"
            />

            <label className="font-medium">
              Producto activo
            </label>
          </div>

          {/* PRESENTATIONS */}
          <div className="flex flex-col gap-5">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-xl font-bold">
                  Presentaciones
                </h3>

                <p className="text-sm text-gray-500">
                  Gestioná precios y stock
                </p>
              </div>

              <button
                type="button"
                onClick={addPresentation}
                className="
                  flex items-center gap-2
                  rounded-xl
                  bg-primary
                  px-4 py-3
                  text-white
                  font-medium
                "
              >
                <Plus size={18} />
                Agregar
              </button>
            </div>

            {presentations.map(
              (
                presentation,
                index
              ) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-gray-200
                    p-5
                    flex flex-col gap-5
                    bg-gray-50
                  "
                >

                  {/* TOP */}
                  <div className="flex items-center justify-between">

                    <h4 className="font-semibold">
                      Presentación #
                      {index + 1}
                    </h4>

                    <button
                      type="button"
                      onClick={() =>
                        removePresentation(
                          index
                        )
                      }
                      className="
                        p-2
                        rounded-lg
                        text-red-500
                        hover:bg-red-100
                      "
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* GRID */}
                  <div className="grid md:grid-cols-5 gap-4">

                    {/* LABEL */}
                    <div className="flex flex-col gap-2">

                      <label className="text-sm font-medium">
                        Tamaño
                      </label>

                      <input
                        type="text"
                        value={
                          presentation.label
                        }
                        onChange={(e) =>
                          updatePresentation(
                            index,
                            "label",
                            e.target.value
                          )
                        }
                        placeholder="500 gr"
                        className="
                          rounded-xl
                          border
                          border-gray-200
                          px-3 py-2
                        "
                      />
                    </div>

                    {/* COST */}
                    <div className="flex flex-col gap-2">

                      <label className="text-sm font-medium">
                        Costo
                      </label>

                      <input
                        type="number"
                        value={
                          presentation.supplierCost
                        }
                        onChange={(e) =>
                          updatePresentation(
                            index,
                            "supplierCost",
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="
                          rounded-xl
                          border
                          border-gray-200
                          px-3 py-2
                        "
                      />
                    </div>

                    {/* MARGIN */}
                    <div className="flex flex-col gap-2">

                      <label className="text-sm font-medium">
                        Ganancia %
                      </label>

                      <input
                        type="number"
                        value={
                          presentation.profitMargin
                        }
                        onChange={(e) =>
                          updatePresentation(
                            index,
                            "profitMargin",
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="
                          rounded-xl
                          border
                          border-gray-200
                          px-3 py-2
                        "
                      />
                    </div>

                    {/* FINAL PRICE */}
                    <div className="flex flex-col gap-2">

                      <label className="text-sm font-medium">
                        Precio final
                      </label>

                      <input
                        type="number"
                        value={
                          presentation.finalPrice
                        }
                        readOnly
                        className="
                          rounded-xl
                          border
                          border-gray-200
                          px-3 py-2
                          bg-gray-100
                        "
                      />
                    </div>

                    {/* STOCK */}
                    <div className="flex flex-col gap-2">

                      <label className="text-sm font-medium">
                        Stock
                      </label>

                      <input
                        type="number"
                        value={
                          presentation.stock
                        }
                        onChange={(e) =>
                          updatePresentation(
                            index,
                            "stock",
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="
                          rounded-xl
                          border
                          border-gray-200
                          px-3 py-2
                        "
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="
                rounded-xl
                border
                px-5 py-3
                font-medium
                disabled:opacity-50
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="
                rounded-xl
                bg-primary
                px-5 py-3
                font-medium
                text-white
                disabled:opacity-50
              "
            >
              {isSaving
                ? "Guardando..."
                : product
                ? "Guardar cambios"
                : "Crear producto"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}