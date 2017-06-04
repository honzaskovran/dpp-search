'use strict';

module.exports = (app) => {
  const searchController = require('../controller/search');

  app.route('/find-connection')
    .get(searchController.findConnection);
};

