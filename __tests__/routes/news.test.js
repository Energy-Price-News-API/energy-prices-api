const mockAxios = require('axios');
const supertest = require('supertest');
const createServer = require('../../src/server');

const app = createServer();
const request = supertest(app);

describe('News Api Route', () => {
  beforeEach(() => mockAxios.get('_'));

  it('should return all the articles', async () => {
    const response = await request.get('/api/news');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    console.log('Test response', response.text);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});
