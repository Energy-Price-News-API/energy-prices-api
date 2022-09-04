const axios = require('axios');
const sources = require('../../data/sources.json');
const sc = require('short-crypt');
const getDataFromCheerio = require('../../utils/getDataFromCheerio');
const getSourceImageFromCheerio = require('../../utils/getSourceImageFromCheerio');
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
        image: /^((http|https):\/\/)/.test(returned.image)
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
          image: /^((http|https):\/\/)/.test(returnedSingle.image)
            ? returnedSingle.image
            : defaultImage,
        };
      });

      return res.json(singleSourceArticles);
    } catch (error) {
      console.log({ error });
      return;
    }
  },
  getSources : async (req,res) =>{
    const sourcesWithEndPoint = {};
   
      
    for (let i = 0; i < sources.length; i++) {
        let source = sources[i];
        try {
            const response = await axios.get(source.site);
            const sourceImageLink =   getSourceImageFromCheerio( response.data); // image link for each source
            const hosturl = `${req.protocol}://${req.get('host')}`; // url of host
            const apipath = req.originalUrl.replace(req.url,''); //url of apipath
            const sourceUrl = hosturl+apipath+`/${source.name.toLowerCase().replace(/ /g, '')}`; //url for each source endpoint
            
            sourcesWithEndPoint[
              new sc(source.site)  // use short-crypt to "hash" the url which works as unique ID
              .encryptToQRCodeAlphanumeric(source.site)
              .slice(0, 10)
              ] = {
                SourceName: source.name,
                SourceEndPoint:sourceUrl,
                Image: /^((http|https):\/\/)/.test(sourceImageLink)
                ? sourceImageLink
                : defaultImage,
              };
            }
        catch (error) {
              console.log({error });
                }
    }
return   res.json( sourcesWithEndPoint);
}
    
   
};

module.exports = controller;
