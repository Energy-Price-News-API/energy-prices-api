const cheerio = require('cheerio');
const getTitle = require('./getTitle');

function getDataFromCheerio(html) {
  if (!html) throw new Error('There is nothing to load here');

  let title = '';
  let url = '';

  const $ = cheerio.load(html);
  $('a:contains("energy")', html).each(function () {
    title = getTitle(
      $(this)
        .text()
        .replace(/(\r\n|\n|\r)/gm, '')
        .trim()
    );

    url = $(this).attr('href');
  });

  return { url, title };
}

module.exports = getDataFromCheerio;
