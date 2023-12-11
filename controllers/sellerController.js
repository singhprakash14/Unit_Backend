const services = require('../service/sellerService');

const createCatalog = async (req, res) => {
  try {
    const { products } = req.body;
    const newCatalog = await services.createCatalogService(req.userId, products);
    res.status(201).json({ message: 'Catalog created successfully', catalog: newCatalog });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = await services.createProductService(req.userId, name, price);
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await services.getOrdersService(req.userId);
    res.status(200).json({ message: 'List of orders retrieved successfully', orders });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = { createCatalog, createProduct, getOrders };
