const mockAxios = require('axios');
const supertest = require('supertest');
const { app } = require('../../src/app');

const request = supertest(app);

// jest.mock('axios');

describe('News api route', () => {
  it('should return all the articles', async () => {
    mockAxios.get();
    // axios.get.mockImplementation(() => Promise.resolve(articles));

    const response = await request.get('/api/news');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(articles);
  });
});
