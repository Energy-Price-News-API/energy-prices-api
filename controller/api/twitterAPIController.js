const path = require("path");
const axios = require("axios");
const keywords = require("../../data/keywords");
const twitterAccounts = require("../../data/accounts.json");
const tweets = [];

twitterAccounts.forEach((twitterAccount) => {
  keywords.forEach((keyword) => {
    axios
      .get(
        "https://twitter.com/search?p=from%3A" +
          twitterAccount.account +
          `${keyword}`
      )
      .then((response) => {
        tweets.push({
          "See tweets from": "@" + twitterAccount.account,
          link:
            "https://twitter.com/search?q=from%3A" +
            twitterAccount.account +
            `${keyword}`,
        });
      });
  });
});

const controller = {
  accounts: (req, res) => {
    res.json(tweets);
  },
};

module.exports = controller;
