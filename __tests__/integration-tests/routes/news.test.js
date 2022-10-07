const mockAxios = require('axios');
const supertest = require('supertest');
const createServer = require('../../../src/server');
const sources = require('../../../src/data/sources.json')
const regions = require('../../../src/data/regions.json');

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

describe('/api/news/sources', () => {
  beforeEach(() => mockAxios.get('_')  );

  it('should return data by regions', async () => {
    
    const response = await request.get('/api/news/regions');
    const SUPPORTED_REGIONS = JSON.parse(JSON.stringify(regions)).map(region => region.name);
    const responseRegions = Object.entries(response.body).map(([_, value]) => value.name);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(SUPPORTED_REGIONS).toEqual(responseRegions);
  });

  it('should return data by region id', async () => {
    const REGION = 'asia';
    const response = await request.get(`/api/news/regions/${REGION}`);
    const responseByRegions = Object.entries(response.body).map(([_, value]) => value.Region);

    expect(mockAxios.get).toHaveBeenCalledTimes(responseByRegions.length + 1);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    responseByRegions.forEach(region => expect(region.toLowerCase()).toBe(REGION));
  });

  it('should return 404 for unsupported region id', async () => {
    const REGION = 'unsupportedRegion';
    const response = await request.get(`/api/news/regions/${REGION}`);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(404);
    expect(response.body).toBeTruthy();
    expect(response.data).toBe(undefined);
  });
})