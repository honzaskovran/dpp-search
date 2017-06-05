'use strict';
const DppParser = require('../model/DppParser');
exports.findConnection = (request, response) => {
  const params = {
    from: request.query.from,
    to: request.query.to,
    across: request.query.across || '',
    date: request.query.date,
    time: request.query.time,
    isDeparture: request.query.isDeparture || 1
  };

  const callback = (restResponse) => (response) => { const responseJSON = restResponse.json(response); restResponse.send(responseJSON)};
  DppParser(params, callback(response));
};
