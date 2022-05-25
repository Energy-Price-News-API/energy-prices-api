const cheerio = require('cheerio');
const getTitle = require('./getTitle');

function getDataFromCheerio(html) {
  if (!html) throw new Error('There is nothing to load here');

  let filterTitle = '';
  let url = '';

  const $ = cheerio.load(html);
  $('a:contains("energy")', html).each(function () {
    const title = getTitle(
      $(this)
        .text()
        .replace(/(\r\n|\n|\r)/gm, '')
        .trim()
    );

    url = $(this).attr('href');

    //splitting title by '...'
    const sentences = title.split('...');

    //Set will provide us with distinct values in array
    filterTitle = [...new Set(sentences)][0];
  });

  return { url, filterTitle };
}

module.exports = getDataFromCheerio;
