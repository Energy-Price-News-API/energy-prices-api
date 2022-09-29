const mockAxios = require('axios');
const supertest = require('supertest');
const createServer = require('../../../src/server');
const sources = require('../../../src/data/sources.json')

const app = createServer();
const request = supertest(app);

describe('News Api Route', () => {
  beforeEach(() => mockAxios.get('_'));

  it('should return all the articles', async () => {
    const response = await request.get('/api/news');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});

describe('News Sources Api Route', () => {
  beforeEach(() => mockAxios.get('_'));

  it('should return a list of all available sources', async () => {
    const response = await request.get('/api/news/sources');
    expect(mockAxios.get).toHaveBeenCalledTimes(sources.length + 1); // call until it has no more to call
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  })
})
