const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/* GET About-us Page. */
router.get('/', productController.list);

router.get('/wishlist', productController.wishList);

router.get('/cart', productController.cart);

router.get('/checkout', productController.checkout);

router.get('/:productId', productController.detail);


module.exports = router;
