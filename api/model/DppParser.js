'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const BASE_URL = 'http://spojeni.dpp.cz/ConnForm.aspx';

module.exports = (params, callback) => {
  const { from, to, across, date, time, isDeparture } = params;
  axios.get(
    BASE_URL,
    {
      params: {
        cl: 'C',
        res: 1,
        tom: 0,
        f: from,
        t: to,
        v: across,
        date: date,
        time: time,
        isdep: isDeparture,
        cmdSearch: 'vyhledat'
      },
      responseType: 'html'
    }
  ).then((response) => {
    callback(parseResponse(response.data));
  }).catch((error) => {
    callback('error');
  });
};

const parseResponse = (response) => {
  const connections = [];
  const $ = cheerio.load(response);
  $('div.spojeni').each((i, el) => {
    const $connection = $(el);
    const $routes = $connection.find('.usek');
    const connection = Object.assign(extractDuration($connection.find('h3')), {routes: []});

    $routes.each((i, el) => {
      const route = extractRouteType($(el));

      route.start = {
        station: $(el).find('.start a').text(),
        time: extractTime($(el).find('.start').text())
      };

      route.end = {
        station: $(el).find('.cil a').text(),
        time: extractTime($(el).find('.cil').text())
      };

      connection.routes.push(route);
    });
    connections.push(connection);
  });
  return connections;
};

const extractTime = (string) => {
  // remove fucking two dots from end markup
  string = string.replace('. .', '');

  const arr = string.split(' ');
  return arr[arr.length - 1];
};

const extractRouteType = ($el) => {
  let string = $el.find('.tram a, .bus a, .metro-a a, .metro-b a, .metro-c a').text();

  // remove é from metro line Bé and Cé
  string = string.replace('é', '');
  const arr = string.split(' ');

  return {type: arr[0], line: arr[1]}
};

const extractDuration = ($el) => {
  const startEnd = $el.find('strong').text().split(' ');
  return {
    start: startEnd[0],
    end: startEnd[startEnd.length - 1]
  };
};
