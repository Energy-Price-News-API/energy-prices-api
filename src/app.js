const PORT = 8000;
const createServer = require('./server');

const app = createServer();

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || PORT, () =>
    console.log(`server running on PORT ${PORT}`)
  );
}
