const regions = require('../data/regions.json');
const path = require('path');


//Finds sourceId match within existingSources, if not, return 404 page not found.
function existingRegionMiddleware(req, res, next) {
  const sourceId = req.params.regionId;

  const regionFound = regions.filter(
    (region) => region.name.toLowerCase().replace(/ /g, '') === sourceId
  );

  if (regionFound.length === 0) {
    return res.status(404).sendFile(path.resolve('./src/views/not-found.html'));
  }
  next();
}

module.exports = existingRegionMiddleware;
