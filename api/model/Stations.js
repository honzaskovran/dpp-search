'use strict';

const axios = require('axios');
const URL = 'http://opendata.iprpraha.cz/CUR/DOP/DOP_PID_ZASTAVKY_B/S_JTSK/DOP_PID_ZASTAVKY_B.json';

module.exports = (params, callback) => {
  axios.get(
    URL,
    {
      params
    }
  ).then((response) => {
    callback(extractStations(response.data));
  }).catch((response) => {
    callback('error');
  })
};

const extractStations = (data) => {

    return data.features.map((feature) => {
      return {
        name: feature.properties.ZAST_NAZEV,
        zone: feature.properties.ZAST_PASMO,
        hubId: feature.properties.ZAST_UZEL_CISLO,
        coordinates: feature.geometry.coordinates
      }
    });
};
