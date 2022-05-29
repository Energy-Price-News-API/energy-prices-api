const cheerio = require('cheerio');
const getTitle = require('./getTitle');
const keywords = require('../../src/data/keywords');

function getDataFromCheerio(html) {
  if (!html) throw new Error('There is nothing to load here');

  // let title = '';
  // let url = '';
  let returnedArticles = [];

  const $ = cheerio.load(html);
  keywords.forEach((keyword) => {
    $("a:contains('" + keyword + "')", html).each(function () {
      title = getTitle(
        $(this)
          .text()
          .replace(/(\r\n|\n|\r)/gm, '')
          .trim()
      );

      url = $(this).attr('href');

      returnedArticles.push({"title": title, "url": url})
    });
  });

  console.log(returnedArticles)
  return returnedArticles;
}

module.exports = getDataFromCheerio;
