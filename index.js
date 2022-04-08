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
        base: ''
    },
    {
        name: 'The Times',
        site: 'https://www.thetimes.co.uk/#section-news',
        base: 'https://www.thetimes.co.uk'
    },
    {
        name: 'The Telegraph',
        site: 'https://www.telegraph.co.uk/money/',
        base: 'https://www.telegraph.co.uk'
    }
]

const articles = []

sources.forEach(source => {
    axios.get(source.site)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("energy")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: source.base + url,
                    source: source.name
                })
            })

        })
})

app.get('/', (req, res) => {
    res.json('Welcome to the Energy Price News tracker API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:sourceId', async (req, res) => {
    const sorceId = req.params.sourceId

    const source = sources.filter(source => source.name == sourceId)

    axios.get('')
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))