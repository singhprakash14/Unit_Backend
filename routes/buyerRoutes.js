const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');
const authMiddleware = require('../middleware/auth');


router.get('/list-of-sellers', authMiddleware.verifytoken, buyerController.getListOfSellers);
router.get('/seller-catalog/:seller_id', authMiddleware.verifytoken, buyerController.getSellerCatalog);
router.post('/create-order/:seller_id', authMiddleware.verifytoken, buyerController.createOrder);
router.get('/get-product', authMiddleware.verifytoken, buyerController.getProducts);
module.exports = router;
