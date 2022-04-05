const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');


/* GET Contact Page. */
router.get('/', contactController.contact);

module.exports = router;
