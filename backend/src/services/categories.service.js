import * as CategoryModel from "../models/category.model.js";
import * as ProductModel from "../models/product.model.js";

const slugify = (value) =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

export const getAllCategoriesService = async () => {
  return await CategoryModel.getAll();
};

export const createCategoryService = async ({ name }) => {
  if (!name || !name.trim()) {
    throw new Error("El nombre es obligatorio");
  }

  const trimmedName = name.trim();
  const id = slugify(trimmedName);

  const existing = await CategoryModel.getById(id);

  if (existing) {
    throw new Error("Ya existe una categoría con ese nombre");
  }

  return await CategoryModel.create({
    id,
    name: trimmedName,
    createdAt: new Date().toISOString(),
  });
};

export const updateCategoryService = async (id, { name }) => {
  const existingCategory = await CategoryModel.getById(id);

  if (!existingCategory) {
    throw new Error("Categoría no encontrada");
  }

  if (!name || !name.trim()) {
    throw new Error("El nombre es obligatorio");
  }

  const trimmedName = name.trim();

  const updatedCategory = await CategoryModel.update(id, {
    name: trimmedName,
  });

  if (trimmedName !== existingCategory.name) {
    const affectedProducts = await ProductModel.getByCategory(
      existingCategory.name
    );

    await Promise.all(
      affectedProducts.map((product) =>
        ProductModel.update(product.id, { category: trimmedName })
      )
    );
  }

  return updatedCategory;
};

export const deleteCategoryService = async (id) => {
  const existingCategory = await CategoryModel.getById(id);

  if (!existingCategory) {
    throw new Error("Categoría no encontrada");
  }

  const affectedProducts = await ProductModel.getByCategory(
    existingCategory.name
  );

  if (affectedProducts.length > 0) {
    throw new Error(
      "No se puede eliminar: hay productos asignados a esta categoría"
    );
  }

  return await CategoryModel.remove(id);
};
