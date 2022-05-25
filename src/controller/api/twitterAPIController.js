const axios = require('axios');

const twitterAccounts = require('../../data/accounts.json');
const tweets = [];

twitterAccounts.forEach((twitterAccount) => {
  axios
    .get(
      'https://twitter.com/search?p=from%3A' +
        twitterAccount.account +
        '%20energy'
    )
    .then((response) => {
      tweets.push({
        'See tweets from': '@' + twitterAccount.account,
        link:
          'https://twitter.com/search?q=from%3A' +
          twitterAccount.account +
          '%20energy',
      });
    });
});

const controller = {
  accounts: (req, res) => {
    res.json(tweets);
  },
};

module.exports = controller;
