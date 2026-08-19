const crypto = require('node:crypto');

// deterministic short "hash" of a url, which works as unique ID
function getShortId(url) {
  return crypto.createHash('sha256').update(url).digest('base64url').slice(0, 10);
}

module.exports = getShortId;
