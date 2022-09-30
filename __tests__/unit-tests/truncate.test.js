const truncate = require('../../src/utils/truncate');
const articles = require('../../__mocks__/articles')

describe('Truncate String Method', () => {
      let mockReq = {
        query: {
            trunc: 5
        }
      };

      let mockReqLong = {
        query: {
            trunc: 30
        }
      }

      let mockRes = {};

    it('should not truncate a string less than 10 characters in length', () => {
        const value = truncate(mockReq, mockRes, articles);
        expect(value.tinyTitle.title).toBe(articles.tinyTitle.title);
        expect(value.tinyTitle.title.length).toBe(articles.tinyTitle.title.length);
    });

    it('should truncate to a minimum of 10 characters', () => {
        const value = truncate(mockReq, mockRes, articles);
        expect(value.shortTitle.title).toBe('energy sec...');
        expect(value.mediumTitle.title).toHaveLength(13);
        expect(value.longTitle.title).toHaveLength(13);
        expect(value.tinyTitle.title).toHaveLength(8);
    });

    it('should end truncated titles with an ellipsis', () => {
        const value = truncate(mockReq, mockRes, articles);
        expect(value.shortTitle.title.slice(-3)).toBe('...');
        expect(value.mediumTitle.title.slice(-3)).toBe('...');
        expect(value.longTitle.title.slice(-3)).toBe('...');
        expect(value.tinyTitle.title.slice(-3)).toBe('ill');
    });

    it('should truncate according to query param set', () => {
        const value = truncate(mockReqLong, mockRes, articles);
        expect(value.shortTitle.title).toBe(articles.shortTitle.title);
        expect(value.mediumTitle.title).toBe('India is moving quite quickly ...');
        expect(value.longTitle.title).toBe('PM Modi pointed out that India...');
        expect(value.tinyTitle.title).toBe(articles.tinyTitle.title);
    });

    it('should return the same number of articles as it is sent', () => {
        const value = truncate(mockReqLong, mockRes, articles);
        expect(value).toMatchObject(expect.objectContaining({
            'longTitle': expect.objectContaining({
                'title': expect.any(String),
                'url': expect.any(String),
                'source': expect.any(String),
                'image': expect.any(String),
            }),
            'mediumTitle': expect.objectContaining({
                'title': expect.any(String),
                'url': expect.any(String),
                'source': expect.any(String),
                'image': expect.any(String)
            }),
            'shortTitle': expect.objectContaining({
                'title': expect.any(String),
                'url': expect.any(String),
                'source': expect.any(String),
                'image': expect.any(String)
            }),
            'tinyTitle': expect.objectContaining({
                'title': expect.any(String),
                'url': expect.any(String),
                'source': expect.any(String),
                'image': expect.any(String)
            })
          }
        ))}
    )
})