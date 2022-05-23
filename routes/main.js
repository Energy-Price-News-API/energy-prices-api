const express = require('express');
const router = express.Router();

const mainController = require('../controller/mainController');

//HOME
router.get('/', mainController.home)

module.exports = router;