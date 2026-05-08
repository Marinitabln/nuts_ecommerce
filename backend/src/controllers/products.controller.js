import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../services/products.service.js";


export const getAllProducts = async(req, res) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async(req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async(req, res) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateProduct = async(req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const product = await updateProductService(id, updatedData);

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


export const deleteProduct = async (req, res) => {
  try {
    const deleted = deleteProductService(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};