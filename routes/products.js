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

router.get('/api/filter-sortAsc-products/:priceStart&:priceEnd', productController.filterSortAscProducts);

router.get('/api/filter-sortDesc-products/:priceStart&:priceEnd', productController.filterSortDescProducts);

router.get('/api/filter-products-by-type/:priceStart&:priceEnd&:category', productController.filterProductsByType);//

router.get('/api/search-products/:value', productController.searchProducts);

router.get('/api/search-sortAsc-products/:value', productController.searchSortAscProducts);

router.get('/api/search-sortDesc-products/:value', productController.searchSortDescProducts);

router.get('/api/search-sortDesc-products-type/:value&:category', productController.searchProductsType);//

router.get('/api/list-sortAsc-products', productController.sortAscProducts);

router.get('/api/list-sortDesc-products', productController.sortDescProducts);

router.get('/api/list-products', productController.listProducts);

router.post('/pay', productController.payPal);

router.get('/pay/success', productController.payPalSuccess);

router.get('/pay/cancel', productController.payPalCancel);


module.exports = router;
