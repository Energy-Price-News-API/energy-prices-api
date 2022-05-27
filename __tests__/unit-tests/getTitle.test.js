const getTitle = require('../../src/utils/getTitle');

describe('Get Title Method', () => {
  let title = '';

  it('should return the title if there is no alt tag', () => {
    title = 'Article title';
    const value = getTitle(title);
    expect(value).toBe(title);
  });

  it('should filter the title and return everything inside the alt tag', () => {
    title = `<img src="//thetimes.co.uk/abracadabra" alt="Article title">`;
    const value = getTitle(title);
    expect(value).toBe('Article title');
  });

  it('should split the title by "..." and return the first one in the array', () => {
    title = `Inflation hit a 40-year high ... City economists had forecast a rise of 9.1 per cent.`;
    const value = getTitle(title);
    expect(value).toBe('Inflation hit a 40-year high ');
  });
});
