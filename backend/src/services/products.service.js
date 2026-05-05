import * as ProductModel from "../models/product.model.js";

export const getAllProductsService = () => {
  return ProductModel.getAll();
};

export const getProductByIdService = (id) => {
  const product = ProductModel.getById(id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  return product;
};

export const createProductService = (data) => {
  const { name, description, imageUrl, category, presentations } = data;

  if (!name || !presentations || !Array.isArray(presentations)) {
    throw new Error("Datos inválidos");
  }

  const newProduct = {
    id: Date.now().toString(),
    name,
    description: description || "",
    imageUrl: imageUrl || "",
    category: category || "general",
    presentations,
    createdAt: new Date().toISOString(),
  };

  return ProductModel.create(newProduct);
};

export const deleteProductService = (id) => {
  const deleted = ProductModel.remove(id);

  if (!deleted) {
    throw new Error("Producto no encontrado");
  }

  return deleted;
};