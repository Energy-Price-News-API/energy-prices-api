const axios = require('axios');

const twitterAccounts = require('../../data/accounts.json');
const tweets = [];

twitterAccounts.forEach(async (twitterAccount) => {
  await axios.get(
    'https://twitter.com/search?p=from%3A' +
      twitterAccount.account +
      '%20energy'
  );

  tweets.push({
    'See tweets from': '@' + twitterAccount.account,
    link:
      'https://twitter.com/search?q=from%3A' +
      twitterAccount.account +
      '%20energy',
  });
});

const controller = {
  getTwitterAccounts: (req, res) => {
    return res.json(tweets);
  },
};

module.exports = controller;
