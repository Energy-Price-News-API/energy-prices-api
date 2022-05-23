const express = require('express');
const router = express.Router();

const twitterController = require('../../controller/api/twitterAPIController');

//ACCOUNTS
router.get('/', twitterController.accounts)

module.exports = router;