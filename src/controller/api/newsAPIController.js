const axios = require('axios');
const sources = require('../../data/sources.json');
const getDataFromCheerio = require('../../utils/getDataFromCheerio');

let articles = {};

sources.forEach(async (source) => {
  try {
    const response = await axios.get(source.site);
    const { url, title } = getDataFromCheerio(response.data);

    articles[url] = {
      title,
      url: source.base + url,
      source: source.name,
    };
  } catch (error) {
    console.log({ error });
    return;
  }
});

const controller = {
  getNews: (req, res) => {
    return res.json(articles);
  },
  getNewsBySource: async (req, res) => {
    const sourceId = req.params.sourceId;
    const singleSourceArticles = {};

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
      const { url, title } = getDataFromCheerio(response.data);

      singleSourceArticles[url] = {
        title,
        url: sourceBase + url,
        source: sourceName,
      };

      return res.json(singleSourceArticles);
    } catch (error) {
      console.log({ error });
      return;
    }
  },
};

module.exports = controller;
