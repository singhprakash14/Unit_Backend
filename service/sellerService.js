
const createError = require('http-error');
const Catalog = require('../models/Catalogs');
const Order = require('../models/Order');
const Product = require('../models/Product');

const createCatalogService = async (userId, products) => {
  try {
    if (!userId) {
      throw createError(403, 'Access forbidden. Only sellers can create catalogs.');
    }

    const newCatalog = new Catalog({
      seller: userId,
      products: products.map(product => product._id),
    });

    await newCatalog.save();
    return newCatalog;
  } catch (error) {
    console.error(error);
    throw createError(500, 'Internal Server Error');
  }
};

const createProductService = async (userId, name, price) => {
  try {
    if (!userId) {
      throw createError(403, 'Access forbidden. Only sellers can create products.');
    }

    const newProduct = new Product({
      name,
      price,
      seller: userId,
    });

    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error(error);
    throw createError(500, 'Internal Server Error');
  }
};

const getOrdersService = async (userId) => {
  try {
    if (!userId) {
      throw createError(403, 'Access forbidden. Only sellers can view orders.');
    }

    const orders = await Order.find({ seller: userId })
      .populate({
        path: 'products',
        select: 'name price',
      })
      .exec();

    return orders;
  } catch (error) {
    console.error(error);
    throw createError(500, 'Internal Server Error');
  }
};

module.exports = {
  createCatalogService,
  createProductService,
  getOrdersService,
};
