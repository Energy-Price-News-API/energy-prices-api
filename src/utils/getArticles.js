const axios = require('axios');
const sources = require('../data/sources.json');
const getShortId = require('./getShortId');
const getDataFromCheerio = require('./getDataFromCheerio');
const getImage = require('./getImage');

async function getArticles() {
    let articles = {};

    sources.forEach(async (source) => {
        try {
            const response = await axios.get(source.site);
            const returnedArticles = getDataFromCheerio(response.data);

            returnedArticles.forEach(async (returned) => {
                const key = getShortId(returned.url)

                // now we have an array of multiple article's data to iterate through
                articles[
                    key
                    ] = {
                    // key is a "hash" of the url which works as unique ID
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