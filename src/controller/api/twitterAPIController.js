const axios = require('axios');
const keywords = require('../../data/keywords');
const twitterAccounts = require('../../data/accounts.json');
const filterKeyword = require('../../utils/filterKeyword');
const tweets = [];

keywords.forEach((keyword) => {
  twitterAccounts.forEach(async (twitterAccount) => {
    await axios.get(
      'https://twitter.com/search?p=from%3A' +
        twitterAccount.account +
        `${filterKeyword(keyword)}`
    );

    tweets.push({
      'See tweets from': '@' + twitterAccount.account,
      link:
        'https://twitter.com/search?q=from%3A' +
        twitterAccount.account +
        `${filterKeyword(keyword)}`,
    });
  });
});

const controller = {
  getTwitterAccounts: (req, res) => {
    return res.json(tweets);
  },
};

module.exports = controller;
