const getTitle = require('../../src/utils/getTitle');

describe('Utils', () => {
  let title = '';

  it('should return the title if there is no alt tag', () => {
    title = 'Article title';
    const value = getTitle(title);
    expect(value).toBe(title);
  });

  it('should return the title if there is no alt tag', () => {
    title = `<img src="//thetimes.co.uk/abracadabra" alt="Article title">`;
    const value = getTitle(title);
    expect(value).toBe('Article title');
  });
});
