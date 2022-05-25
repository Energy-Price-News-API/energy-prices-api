const path = require('path');

const controller = {
  home: (req, res) => {
    res.sendFile(path.resolve('../views/index.html'));
  },
};

module.exports = controller;
