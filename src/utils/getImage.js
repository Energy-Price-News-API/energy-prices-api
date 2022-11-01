const axios = require("axios");
const cheerio = require("cheerio");
const defaultImage = 'https://energy-price-news.nosweat.cloud/img/energy-prices-api-socials.png'

async function getImage(url) {
    if (/^(https:\/\/12ft.io\/)/.test(url)) {

        url = url.slice(16);

    } else if (url.indexOf('http') !== url.lastIndexOf('http') 
        || url.match(/:\/\//) === null) {

        console.log(`Tripped on ${url}`)
        return defaultImage;

    }
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    image = $('head').find('meta[property="og:image"]').attr('content');

    if (typeof image !== "undefined") {
        return image;
    }

    return defaultImage;
}

module.exports = getImage;