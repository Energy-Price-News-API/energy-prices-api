const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const { html } = require('cheerio/lib/static')

const app = express()

const sources = [
    {
        name: 'The Guardian',
        site: 'https://www.theguardian.com/uk/money',
        base: 'https://12ft.io/'
    },
    {
        name: 'The Times',
        site: 'https://www.thetimes.co.uk/#section-news',
        base: 'https://12ft.io/https://www.thetimes.co.uk'
    },
    {
        name: 'The Telegraph',
        site: 'https://www.telegraph.co.uk/money/',
        base: 'https://12ft.io/https://www.telegraph.co.uk'
    },
    {
        name: 'Metor UK',
        site: 'https://metro.co.uk/news/uk/',
        base: ''
    },
    {
        name: 'BBC news',
        site: 'https://www.bbc.com/news/science-environment-56837908',
        base: 'https://www.bbc.com'
    },
    {
        name: 'Sky news',
        site: 'https://news.sky.com/climate',
        base: 'https://news.sky.com'
    },
    {
        name: 'Reuters',
        site: 'https://www.reuters.com/business/energy/',
        base: 'https://www.reuters.com'
    },
    // TODO: Below not working!
    // {
    //     name: 'Bloomberg',
    //     site: 'https://www.bloomberg.com/green-politics?srnd=green-energy-science',
    //     base: 'https://12ft.io/'
    // }
]

const twitterAccounts = [
    {
        account: 'BorisJohnson'
    },
    {
        account: 'RishiSunak'
    },
    {
        account: 'Keir_Starmer'
    },
    {
        account: 'SadiqKhan'
    }
]

const articles = []
const tweets = []

sources.forEach(source => {
    axios.get(source.site)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("energy")', html).each(function () {
                const title = $(this).text().replace(/(\r\n|\n|\r)/gm, "").trim()
                const url = $(this).attr('href')
                const sentences= title.split('...'); //splitting title by '...'
                const uniqueSentences = [...new Set(sentences)]; //Set will provide us with distinct values in array
                
                articles.push({
                    title: uniqueSentences[0],
                    url: source.base + url,
                    source: source.name
                })
            })

        })
})

twitterAccounts.forEach(twitterAccount => {
    axios.get('https://twitter.com/search?p=from%3A' + twitterAccount.account +'%20energy')
        .then((response) => {

                tweets.push({
                    "See tweets from": '@' + twitterAccount.account,
                    link: 'https://twitter.com/search?q=from%3A' + twitterAccount.account + '%20energy'
                })
            })
        })

app.get('/', (req, res) => {
    res.json('Welcome to the Energy Price News tracker API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:sourceId', (req, res) => {
    const sourceId = req.params.sourceId

    const sourceSite = sources.filter(source => source.name.toLowerCase().replace(/ /g, '') == sourceId)[0].site
    const sourceBase = sources.filter(source => source.name.toLowerCase().replace(/ /g, '') == sourceId)[0].base
    const sourceName = sources.filter(source => source.name.toLowerCase().replace(/ /g, '') == sourceId)[0].name

    axios.get(sourceSite)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const singleSourceArticles = []

            $('a:contains("energy")', html).each(function () {
                const title = $(this).text().replace(/(\r\n|\n|\r)/gm, "").trim()
                const url = $(this).attr('href')
                const sentences= title.split('...'); //splitting title by '...'
                const uniqueSentences = [...new Set(sentences)]; //Set will provide us with distinct values in array 

                singleSourceArticles.push({
                    title: uniqueSentences[0],
                    url: sourceBase + url,
                    source: sourceName
                })
            })
            res.json(singleSourceArticles)
        }).catch(err => console.log(err))
})

app.get('/twitter', (req, res) => {
    res.json(tweets)
})

app.listen(process.env.PORT || PORT, () => console.log(`server running on PORT ${PORT}`))
