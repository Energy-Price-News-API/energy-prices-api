const axios = require('axios');
const sources = require('../../data/sources.json');
const regions = require('../../data/regions.json');
const sc = require('short-crypt');
const getDataFromCheerio = require('../../utils/getDataFromCheerio');
const getSourceImageFromCheerio = require('../../utils/getSourceImageFromCheerio');
const pagination = require('../../utils/paginate');
const truncation = require('../../utils/truncate');
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
        region: source.region,
      };
    });
  } catch (error) {
    console.log({ error });
    return;
  }
});



const sourceObject = async(source,baseUrl)=>{
  const response = await axios.get(source.site);
  const sourceImageLink =   getSourceImageFromCheerio( response.data); // image link for each source
  const sourceUrl = baseUrl+`/${source.name.toLowerCase().replace(/ /g, '')}`; //url for each source endpoint
  return      {SourceName: source.name,
              SourceEndPoint:sourceUrl,
              Image: /^((http|https):\/\/)/.test(sourceImageLink)
              ? sourceImageLink
              : defaultImage,
              Region:source.region
                }     
}

const controller = {
  getNews: (req, res) => {
    if (!!parseInt(req.query.trunc)) {
      const truncatedArticles = truncation(req, res, articles);
      return res.json(truncatedArticles);
    }

    if (parseInt(req.query.page)) {
      const paginatedArticles = pagination(req,res,articles);
      return res.json(paginatedArticles)
    }

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
      if (!!parseInt(req.query.trunc)) {
        const truncatedArticles = truncation(req, res, singleSourceArticles);
        return res.json(truncatedArticles);
      }
  
      if (parseInt(req.query.page)) {
        const paginatedArticles = pagination(req,res,singleSourceArticles);
        return res.json(paginatedArticles)
      }

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
            
            const hosturl = `${req.protocol}://${req.get('host')}`; // url of host
            const apipath = req.originalUrl.replace(req.url,''); //url of apipath
            let sourceObj = await sourceObject(source,hosturl+apipath)
            
            sourcesWithEndPoint[
              new sc(source.site)  // use short-crypt to "hash" the url which works as unique ID
              .encryptToQRCodeAlphanumeric(source.site)
              .slice(0, 10)
              ] = sourceObj
            }
        catch (error) {
              console.log({error });
                }
      }
      if (parseInt(req.query.page)) {
        const paginatedArticles = pagination(req,res,sourcesWithEndPoint);
        return res.json(paginatedArticles)
      }
    return res.json( sourcesWithEndPoint);
    },
  
  getRegions: async (req,res) =>{
    const regionsWithEndPoint = {};
    const hosturl = `${req.protocol}://${req.get('host')}`; // url of host
    const apipath = req.originalUrl; //url of apipath
    regions.forEach((region)=>{
        const regionUrl = hosturl + apipath + `/${region.name.toLowerCase().replace(/ /g, '')}`;
        regionsWithEndPoint[ // use short-crypt to "hash" the url which works as unique ID
        new sc(regionUrl).encryptToQRCodeAlphanumeric(regionUrl)
        .slice(0, 10)
        ] = {name:region.name,
           url: hosturl + apipath + `/${region.name.toLowerCase().replace(/ /g, '')}`
            } ;
          })
      if (parseInt(req.query.page)) {
        const paginatedRegions = pagination(req,res,regionsWithEndPoint);
        return res.json(paginatedRegions)
      }
    return res.json(regionsWithEndPoint);    
  },
  
  getSourcesByRegion : async (req, res) => {
    const regionId = req.params.regionId;
    const sourcesByRegion = {};
    const sourcesRegion = sources.filter(
      (source) => source.region.toLowerCase().replace(/ /g, '') == regionId
    )
    for (let i = 0; i < sourcesRegion.length; i++) {
      let source = sourcesRegion[i];
      try {
        
          const hosturl = `${req.protocol}://${req.get('host')}`; // url of host
          const apipath = req.originalUrl.replace(req.url,''); //url of apipath
          let sourceObj = await sourceObject(source,hosturl+apipath)
          
          sourcesByRegion[
            new sc(source.site)  // use short-crypt to "hash" the url which works as unique ID
            .encryptToQRCodeAlphanumeric(source.site)
            .slice(0, 10)
            ] = sourceObj;
          }
      catch (error) {
            console.log({error });
              }
    }
    if (parseInt(req.query.page)) {
      const paginatedSourcesByRegion = pagination(req,res,sourcesByRegion);
      return res.json(paginatedSourcesByRegion)
    }

    return res.json(sourcesByRegion);      
  }
};

module.exports = controller;
