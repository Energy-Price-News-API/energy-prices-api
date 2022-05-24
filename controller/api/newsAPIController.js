const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const { html } = require('cheerio/lib/static');

const sources = require('../../data/sources.json');
const articles = {};

const getTitle = (value) => {
    const altTitle = value.match(/alt=\"(.*?)\"/g);
    if (altTitle == null) return value;
    return altTitle[0].split('"')[1];
}

sources.forEach((source) => {
    axios.get(source.site).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
  
      $('a:contains("energy")', html).each(function () {
        const title = getTitle($(this)
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
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
    });
});

const controller = {
    news: (req, res) => {
        res.json(articles);
    },
    source: (req, res) => {
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
        
        axios
            .get(sourceSite)
            .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const singleSourceArticles = {};

            $('a:contains("energy")', html).each(function () {
                const title = getTitle($(this)
                    .text()
                    .replace(/(\r\n|\n|\r)/gm, "")
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
                res.json(singleSourceArticles);
            })
            .catch((err) => console.log(err));
    }
};

module.exports = controller;