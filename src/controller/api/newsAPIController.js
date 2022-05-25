const axios = require('axios');
const cheerio = require('cheerio');
const sources = require('../../data/sources.json');
const getTitle = require('../../utils/getTitle');

const articles = {};

sources.forEach(async (source) => {
  try {
    const response = await axios.get(source.site);
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("energy")', html).each(function () {
      const title = getTitle(
        $(this)
          .text()
          .replace(/(\r\n|\n|\r)/gm, '')
          .trim()
      );
      const url = $(this).attr('href');
      const sentences = title.split('...'); //splitting title by '...'
      const uniqueSentences = [...new Set(sentences)]; //Set will provide us with distinct values in array

      articles[url] = {
        title: uniqueSentences[0],
        url: source.base + url,
        source: source.name,
      };
    });
  } catch (error) {
    console.log({ error });
    throw new Error(error.message);
  }
});

const controller = {
  news: (req, res) => {
    return res.json(articles);
  },
  source: async (req, res) => {
    const sourceId = req.params.sourceId;

    const sourceSite = sources.filter(
      (source) => source.name.toLowerCase().replace(/ /g, '') == sourceId
    )[0].site;
    const sourceBase = sources.filter(
      (source) => source.name.toLowerCase().replace(/ /g, '') == sourceId
    )[0].base;
    const sourceName = sources.filter(
      (source) => source.name.toLowerCase().replace(/ /g, '') == sourceId
    )[0].name;

    try {
      const response = await axios.get(sourceSite);
      const html = response.data;
      const $ = cheerio.load(html);
      const singleSourceArticles = {};

      $('a:contains("energy")', html).each(function () {
        const title = getTitle(
          $(this)
            .text()
            .replace(/(\r\n|\n|\r)/gm, '')
            .trim()
        );
        const url = $(this).attr('href');
        const sentences = title.split('...'); //splitting title by '...'
        const uniqueSentences = [...new Set(sentences)]; //Set will provide us with distinct values in array

        singleSourceArticles[url] = {
          title: uniqueSentences[0],
          url: sourceBase + url,
          source: sourceName,
        };
      });
      return res.json(singleSourceArticles);
    } catch (error) {
      console.log({ error });
      throw new Error(error.message);
    }
  },
};

module.exports = controller;
