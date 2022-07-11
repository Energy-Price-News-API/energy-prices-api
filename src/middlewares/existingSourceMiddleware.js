const sources = require('../data/sources.json');
const path = require('path');
const existingSources = sources.map((source) => source.name);

//Finds sourceId match within existingSources, if not, return 404 page not found.
function existingSourceMiddleware(req, res, next) {
  const sourceId = req.params.sourceId;
  const sourceFound = existingSources.filter(
    (source) => source.toLowerCase().replace(/ /g, '') === sourceId
  );
  if (sourceFound.length === 0) {
    return res.status(404).sendFile(path.resolve('./src/views/not-found.html'));
  }
  next();
}

module.exports = existingSourceMiddleware;
