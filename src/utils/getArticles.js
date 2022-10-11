const axios = require('axios');
const sources = require('../data/sources.json');
const sc = require('short-crypt');
const getDataFromCheerio = require('./getDataFromCheerio');

async function getArticles() {
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
    return articles;
}

module.exports = { getArticles };