const axios = require('axios');
const sources = require('../../data/sources.json');
const sc = require('short-crypt');
const getDataFromCheerio = require('../../utils/getDataFromCheerio');
const defaultImage =
  'https://raw.githubusercontent.com/MizouziE/energy-prices-api/master/public/img/energy-prices-api-socials.png';
let articles = {};

sources.forEach(async (source) => {
  try {
    const response = await axios.get(source.site);
    const returnedArticles = getDataFromCheerio(response.data);

    returnedArticles.forEach(async (returned) => {
      // now we have an array of multiple article's data to iterate through
      articles[
        new sc(returned.url)
          .encryptToQRCodeAlphanumeric(returned.url)
          .slice(0, 10)
      ] = {
        // use short-crypt to "hash" the url which works as unique ID
        title: returned.title,
        url: source.base + returned.url,
        source: source.name,
        image:
          !!returned.image && !!/^((http|https):\/\/)/.test(returned.image)
            ? returned.image
            : defaultImage,
      };
    });
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
      const returnedArticlesSingle = getDataFromCheerio(response.data);

      returnedArticlesSingle.forEach(async (returnedSingle) => {
        singleSourceArticles[
          new sc(returnedSingle.url)
            .encryptToQRCodeAlphanumeric(returnedSingle.url)
            .slice(0, 10)
        ] = {
          title: returnedSingle.title,
          url: sourceBase + returnedSingle.url,
          source: sourceName,
          image: returnedSingle.image ?? defaultImage,
        };
      });

      return res.json(singleSourceArticles);
    } catch (error) {
      console.log({ error });
      return;
    }
  },
};

module.exports = controller;
