const express = require('express');
const controller = require('../../controller/api/newsAPIController');
const router = express.Router();

router.get('/', controller.getNews);
router.get('/:sourceId', controller.getNewsBySource);

module.exports = router;
