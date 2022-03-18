const express = require('express');
const router = express.Router();
const myAccountController = require('../controllers/myAccountController');


/* GET home page. */
router.get('/myAcc', myAccountController.myAccount);

router.get('/signup', myAccountController.register);

router.get('/', myAccountController.login);

module.exports = router;
