const path = require('path');
const express = require('express');
const main = require('./routes/main');
const apiNews = require('./routes/api/news');
// const apiTwitter = require('./routes/api/twitter');
const rateLimit = require('express-rate-limit');

function createServer() {
  const app = express();

  // set up rate limiter: maximum of 60 requests per minute
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60, // 1 request per second
  });

  // apply rate limiter to all requests
  app.use(limiter);
  app.use(express.static('public'));
  app.use('/', main);
  app.use('/api/news', apiNews);
//  app.use('/api/twitter', apiTwitter);
  app.use((req, res, next) => {
    res.status(404).sendFile(path.resolve('./src/views/not-found.html'));
  });

  return app;
}

module.exports = createServer;
