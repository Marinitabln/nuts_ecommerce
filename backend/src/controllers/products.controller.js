import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../services/products.service.js";


export const getAllProducts = (req, res) => {
  try {
    const products = getAllProductsService();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = (req, res) => {
  try {
    const product = getProductByIdService(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = (req, res) => {
  try {
    const product = createProductService(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const product = updateProductService(id, updatedData);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


export const deleteProduct = (req, res) => {
  try {
    const deleted = deleteProductService(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};