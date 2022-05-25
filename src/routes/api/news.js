const express = require('express');
const newsController = require('../../controller/api/newsAPIController');
const router = express.Router();

router.get('/', newsController.news);
router.get('/:sourceId', newsController.source);

module.exports = router;
