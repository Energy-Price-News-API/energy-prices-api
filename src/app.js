const PORT = 8000;
const path = require('path');
const createServer = require('./server');
const main = require('./routes/main');
const apiNews = require('./routes/api/news');
const apiTwitter = require('./routes/api/twitter');

const app = createServer();

app.use('/', main);
app.use('/api/news', apiNews);
app.use('/api/twitter', apiTwitter);
app.use((req, res, next) => {
  res.status(404).sendFile(path.resolve('./views/not-found.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || PORT, () =>
    console.log(`server running on PORT ${PORT}`)
  );
}
