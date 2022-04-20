const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/* GET About-us Page. */
router.get('/', productController.list);

router.get('/fruits', productController.listFruit);

router.get('/vegetables', productController.listVegetables);

router.get('/wishlist', productController.wishList);

router.get('/cart', productController.cart);

router.get('/add-to-cart/:productId', productController.addToCart);

router.get('/remove-from-cart/:productId', productController.removeFromCart);

router.get('/update-cart/:productId&:qty', productController.updateCart);

router.get('/checkout', productController.checkout);

router.get('/:productId', productController.detail);

router.get('/api/filter-products/:priceStart&:priceEnd', productController.filterProducts);

router.get('/api/filter-products-by-type/:priceStart&:priceEnd&:category', productController.filterProductsByType);

router.get('/api/search-products/:value', productController.searchProducts)

router.get('/api/search-products-type/:value&:category', productController.searchProductsType);

module.exports = router;
