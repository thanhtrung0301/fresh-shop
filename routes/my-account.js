const express = require('express');
const router = express.Router();
const myAccountController = require('../controllers/myAccountController');


/* GET home page. */
router.get('/', myAccountController.myAccount);

router.get('/info', myAccountController.accountInfo);

router.post('/info', myAccountController.updateInfoUser);


module.exports = router;
