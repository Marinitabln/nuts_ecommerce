import * as ProductModel from "../models/product.model.js";

export const getAllProductsService = async () => {
  return await ProductModel.getAll();
};

export const getProductByIdService = async (id) => {
  const product = await ProductModel.getById(id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  return product;
};

export const createProductService = async (data) => {
  const { name, description, imageUrl, category, presentations } = data;

  // Validaciones básicas
  if (!name) {
    throw new Error("El nombre es obligatorio");
  }

  if (
    !presentations ||
    !Array.isArray(presentations) ||
    presentations.length === 0
  ) {
    throw new Error("Presentations es obligatorio");
  }

  // Validación estructura presentations
  const isValidPresentations = presentations.every(
    (presentation) =>
      typeof presentation.label === "string" &&
      typeof presentation.price === "number"
  );

  if (!isValidPresentations) {
    throw new Error("Formato de presentations inválido");
  }

  const newProduct = {
    name,
    description: description || "",
    imageUrl: imageUrl || "",
    category: category || "general",
    presentations,
    createdAt: new Date().toISOString(),
  };

  return await ProductModel.create(newProduct);
};

export const updateProductService = async (id, updatedData) => {
  // Verificar si existe
  const existingProduct = await ProductModel.getById(id);

  if (!existingProduct) {
    throw new Error("Producto no encontrado");
  }

  // Validar presentations si vienen en el body
  if (updatedData.presentations) {
    if (
      !Array.isArray(updatedData.presentations) ||
      updatedData.presentations.length === 0
    ) {
      throw new Error("Presentations inválido");
    }

    const isValid = updatedData.presentations.every(
      (presentation) =>
        typeof presentation.label === "string" &&
        typeof presentation.price === "number"
    );

    if (!isValid) {
      throw new Error("Formato de presentations inválido");
    }
  }

  const updatedProduct = {
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  return await ProductModel.update(id, updatedProduct);
};

export const deleteProductService = async (id) => {
  const deleted = await ProductModel.remove(id);

  if (!deleted) {
    throw new Error("Producto no encontrado");
  }

  return deleted;
};