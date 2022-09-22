const path = require('path');

const controller = {
  home: (req, res) => {
    return res.sendFile(path.resolve('./public/views/index.html'));
  },
};

module.exports = controller;
