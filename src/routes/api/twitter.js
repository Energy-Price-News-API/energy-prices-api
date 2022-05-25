const express = require('express');
const twitterController = require('../../controller/api/twitterAPIController');
const router = express.Router();

router.get('/', twitterController.accounts);

module.exports = router;
