const express = require('express');
const controller = require('../../controller/api/newsAPIController');
const router = express.Router();
//Middlewares
const existingSourceMiddleware = require('../../middlewares/existingSourceMiddleware');
const existingRegionMiddleware = require('../../middlewares/existingRegionMiddleware');
router.get('/', controller.getNews);
router.get('/sources', controller.getSources);
router.get('/sources/:sourceId', existingSourceMiddleware, controller.getNewsBySource);
router.get('/regions',controller.getRegions);
router.get('/regions/:regionId',existingRegionMiddleware,controller.getSourcesByRegion);

module.exports = router;
