const express = require('express');
const controller = require('../../controller/api/newsAPIController');
const router = express.Router();
//Middlewares
const existingSourceMiddleware = require('../../middlewares/existingSourceMiddleware');

router.get('/', controller.getNews);
router.get('/sources', controller.getSources);
router.get('/:sourceId', existingSourceMiddleware, controller.getNewsBySource);

module.exports = router;
