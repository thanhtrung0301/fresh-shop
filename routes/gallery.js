const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');


/* GET Contact Page. */
router.get('/', galleryController.gallery);

module.exports = router;
