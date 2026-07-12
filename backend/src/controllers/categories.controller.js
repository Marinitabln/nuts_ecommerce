import {
  getAllCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/categories.service.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await createCategoryService(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await updateCategoryService(id, req.body);
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await deleteCategoryService(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
