const truncate = (req, res, articles) => {
    let trunc = Math.abs(parseInt(req.query.trunc));
    if (trunc < 10 || !trunc) {
        trunc = 10;
    }

    let truncatedArticleTitles = {};

    Object.entries(articles).forEach(([id, scrape]) => {

        const article = Object.fromEntries(Object.entries(scrape));
        const withTruncation = {};

        if (article.title.length > trunc) {
            withTruncation.title = article.title.slice(0, trunc) + '...';
        } else {
            withTruncation.title = article.title;
        }

        withTruncation.url = article.url;
        withTruncation.source = article.source;
        withTruncation.image = article.image;
        withTruncation.region = article.region;

        truncatedArticleTitles[id] = withTruncation;
    })

    return truncatedArticleTitles;
}

module.exports = truncate