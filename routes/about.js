const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

/* GET About-us Page. */
router.get('/', aboutController.about);

module.exports = router;
