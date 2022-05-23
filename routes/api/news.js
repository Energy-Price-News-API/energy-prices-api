const express = require('express');
const router = express.Router();

const newsController = require('../../controller/api/newsAPIController');

//NEWS
router.get('/', newsController.news)
//SOURCEID
router.get('/:sourceId', newsController.source)

module.exports = router;