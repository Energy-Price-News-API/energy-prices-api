const axios = require('axios');
const sources = require('../data/sources.json');
const sc = require('short-crypt');
const getDataFromCheerio = require('./getDataFromCheerio');
const getImage = require('./getImage');

async function getArticles() {
    let articles = {};

    sources.forEach(async (source) => {
        try {
            const response = await axios.get(source.site);
            const returnedArticles = getDataFromCheerio(response.data);

            returnedArticles.forEach(async (returned) => {
                const key = new sc(returned.url)
                    .encryptToQRCodeAlphanumeric(returned.url)
                    .slice(0, 10)
        
                // now we have an array of multiple article's data to iterate through
                articles[
                    key
                    ] = {
                    // use short-crypt to "hash" the url which works as unique ID
                    title: returned.title,
                    url: source.base + returned.url,
                    source: source.name,
                    region: source.region,
                };

                const articleUrl = Object.getOwnPropertyDescriptor(articles[key], 'url')

                articles[key] = { ...articles[key], image: await getImage(articleUrl.value) }
            });
        } catch (error) {
            console.log({ error });
            return;
        }
    });
    return articles;
}

module.exports = { getArticles };