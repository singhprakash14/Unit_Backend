
const createError = require('http-errors');
const User = require('../models/Users');
const Catalog = require('../models/Catalogs');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getListOfSellersService = async () => {
  try {
    return await User.find({ isSeller: true });
  } catch (error) {
    console.error(error);
    throw createError(500, 'Internal Server Error');
  }
};

const getSellerCatalogService = async (sellerId) => {
  try {
    const catalog = await Catalog.findOne({ seller: sellerId }).populate('products');
    if (!catalog) {
      throw createError(404, 'Catalog not found for the specified seller');
    }
    return catalog;
  } catch (error) {
    console.error(error);
    throw createError(500, 'Internal Server Error');
  }
};

const createOrderService = async (sellerId, userId, items) => {
  try {
    const seller = await User.findById(sellerId);
    if (!seller || !seller.isSeller) {
      throw createError(404, 'Seller not found');
    }

    const productIds = items.map(item => item._id);
    const products = await Product.find({ _id: { $in: productIds }, seller: sellerId });

    if (products.length !== items.length) {
      throw createError(404, 'One or more products not found');
    }

    const order = new Order({
      buyer: userId,
      products: productIds,
      seller: sellerId
    });

    await order.save();
    return order;
  } catch (error) {
    console.error(error);
    throw createError(500, 'Internal Server Error');
  }
};

const getProductsService = async () => {
  try {
    return await Product.find();
  } catch (error) {
    console.error(error);
    throw createError(500, 'Internal Server Error');
  }
};

module.exports = {
  getListOfSellersService,
  getSellerCatalogService,
  createOrderService,
  getProductsService
};
