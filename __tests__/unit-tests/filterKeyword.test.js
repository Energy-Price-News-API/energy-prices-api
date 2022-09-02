const filterKeyword = require('../../src/utils/filterKeyword');

describe('Filter keyword function', () => {
  let keyword = '';

  it('should replace the space with %20 in the keyword', () => {
    keyword = 'energy price';
    const value = filterKeyword(keyword);
    expect(value).toBe('energy%20price');
  });

  it('should replace all the spaces with %20 in the keyword', () => {
    keyword = `electricity bill company firms`;
    const value = filterKeyword(keyword);
    expect(value).toBe('electricity%20bill%20company%20firms');
  });
});
