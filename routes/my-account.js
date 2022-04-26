const express = require('express');
const router = express.Router();
const myAccountController = require('../controllers/myAccountController');


/* GET home page. */
router.get('/', myAccountController.myAccount);

router.get('/info', myAccountController.accountInfo);

router.post('/info', myAccountController.updateInfoUser);

router.get('/order', myAccountController.order);

router.get('/api/list-orders', myAccountController.listOrders);


module.exports = router;
