const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/* GET About-us Page. */
router.get('/', productController.list);

router.get('/fruits', productController.listFruit);

router.get('/vegetables', productController.listVegetables);

router.get('/wishlist', productController.wishList);

router.get('/cart', productController.cart);

router.get('/checkout', productController.checkout);

router.get('/:productId', productController.detail);


module.exports = router;
