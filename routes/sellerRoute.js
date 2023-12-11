const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const sellerController = require('../controllers/sellerController');


router.post('/create-catalog', authMiddleware.verifytoken, sellerController.createCatalog);
router.post('/create-product', authMiddleware.verifytoken, sellerController.createProduct);
router.get('/orders', authMiddleware.verifytoken, sellerController.getOrders);

module.exports = router;
