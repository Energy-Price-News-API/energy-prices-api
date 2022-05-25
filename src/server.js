const express = require('express');
// const rateLimit = require('express-rate-limit');

function createServer() {
  const app = express();

  // set up rate limiter: maximum of ten requests per minute
  // const limiter = rateLimit({
  //   windowMs: 1 * 60 * 1000, // 1 minute
  //   max: 10,
  // });

  // apply rate limiter to all requests
  // app.use(limiter);
  app.use(express.static('public'));

  return app;
}

module.exports = createServer;
