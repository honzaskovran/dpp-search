'use strict';

module.exports = (app) => {
  const searchController = require('../controller/search');
  const stationsController = require('../controller/stations');

  app.route('/find-connection')
    .get(searchController.findConnection);

  app.route('/find-stations')
    .get(stationsController.findStations);
};

