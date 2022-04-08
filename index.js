const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const { html } = require('cheerio/lib/static')

const app = express()

const articles = []

app.get('/', (req, res) => {
    res.json('Welcome to the Energy Price News tracker API')
})

app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/uk/money')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("energy")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))