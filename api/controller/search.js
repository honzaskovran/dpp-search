'use strict';

exports.findConnection = (request, response) => {
  console.log(request);
  return response.json({'result': 'found'})
};
