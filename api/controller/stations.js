'use strict';
const Stations = require('../model/Stations');

exports.findStations = (request, response) => {
  const params = {};
  const callback = (restResponse) => (response) => { const responseJSON = restResponse.json(response); restResponse.send(responseJSON)};
  Stations(params, callback(response));
};
