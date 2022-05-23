const PORT = 8000;
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

//View Routes
const main = require('./routes/main')
app.use('/', main);

//API Routes
const apiNews = require('./routes/api/news')
const apiTwitter = require('./routes/api/twitter')

app.use('/api/news', apiNews);
app.use('/api/twitter', apiTwitter);

//Default template for NOT FOUND routes
app.use((req, res, next) => {
    res.status(404).sendFile(path.resolve('./views/not-found.html'));
})

app.listen(process.env.PORT || PORT, () =>
  console.log(`server running on PORT ${PORT}`)
);