const cheerio = require('cheerio');

function getSourceImageFromCheerio(html) {
  if (!html) throw new Error('There is nothing to load here');

  const $ = cheerio.load(html);
  ogImageLink = $('head').find('meta[property*="og:image"]').attr('content') // returns og:image from parent site  
  return ogImageLink;
}
module.exports = getSourceImageFromCheerio;