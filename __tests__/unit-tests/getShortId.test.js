const getShortId = require('../../src/utils/getShortId');

describe('Get Short Id Method', () => {
  const url = 'https://www.theguardian.com/environment/energy';

  it('should return the same id for the same url', () => {
    expect(getShortId(url)).toBe(getShortId(url));
  });

  it('should return a different id for a different url', () => {
    expect(getShortId(url)).not.toBe(getShortId(url + '/prices'));
  });

  it('should return an id of 10 characters', () => {
    expect(getShortId(url)).toHaveLength(10);
  });

  it('should only return url safe characters', () => {
    expect(getShortId(url)).toMatch(/^[A-Za-z0-9_-]{10}$/);
  });

  it('should return unique ids for every source', () => {
    const sources = require('../../src/data/sources.json');
    const ids = sources.map((source) => getShortId(source.site));

    expect(new Set(ids).size).toBe(sources.length);
  });
});
