const sources = require('../data/sources.json');
const path = require('path');
const eSources = sources.map((source) => source.name); //Existing sources

function existingSourceMiddleware(req, res, next) {
  const sourceId = req.params.sourceId;
  const sourceFound = eSources.filter(
    (source) => source.toLowerCase().replace(/ /g, '') === sourceId
  );
  if (sourceFound.length === 0) {
    return res.status(404).sendFile(path.resolve('./src/views/not-found.html'));
  }
  next();
}

module.exports = existingSourceMiddleware;
