const services = require('../service/buyService');

const getListOfSellers = async (req, res) => {
  try {
    const sellers = await services.getListOfSellersService();
    res.status(200).json({ sellers });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

const getSellerCatalog = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const catalog = await services.getSellerCatalogService(seller_id);
    res.status(200).json({ catalog });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

const createOrder = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const { items } = req.body;

    const order = await services.createOrderService(seller_id, req.userId, items);
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await services.getProductsService();
    res.status(200).json({ products });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = { getListOfSellers, getSellerCatalog, createOrder, getProducts };
