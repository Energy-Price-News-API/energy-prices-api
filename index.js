const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))