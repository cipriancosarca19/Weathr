'use strict';

const Hapi = require('hapi');
const axios = require('axios');

const weathr = new Hapi.Server();
weathr.connection({
  port: 3001,
  host: '0.0.0.0',
});

const buildGeocodeURL = locationQuery =>
  `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDjh11j9IJHALxDJd4z--VMuTLpAEbANyA&address=${locationQuery}`;
const buildForecastURL = (lat, lng, units) =>
  `https://api.darksky.net/forecast/9c05b6662a30448a33162cc584b4a264/${lat},${lng}?units=${units}`;

const geocode = locationQuery =>
  new Promise((resolve, reject) => {
    axios.get(buildGeocodeURL(locationQuery))
      .then(response => {
        const status = response.data.status;
        if (status !== 'OK') {
          switch (status) {
            case 'OVER_QUERY_LIMIT':
              reject({
                message: 'Query limit reached: Google Maps API\'s query limit has been reached',
                code: 403,
              });
              break;
            case 'ZERO_RESULTS':
              reject({
                message: `Location not found: the query ${locationQuery} yielded no results`,
                code: 404,
              });
              break;
            default:
              reject({
                message: 'Unknown server error: Google Maps API may be down or not functional',
                code: 500,
              });
              break;
          }
        }

        resolve({
          address: response.data.results[0].formatted_address,
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        });
      })
      .catch(err => reject(err));
  });

const forecast = (lat, lng, units) =>
  new Promise((resolve, reject) => {
    axios.get(buildForecastURL(lat, lng, units))
      .then(response => {
        resolve({
          currently: response.data.currently ? response.data.currently : null,
          minutely: response.data.minutely ? response.data.minutely : null,
          hourly: response.data.hourly ? response.data.hourly : null,
          daily: response.data.daily ? response.data.daily : null,
        });
      })
      .catch(err => reject(err));
  })

weathr.route({
  method: 'GET',
  path: '/weathr/{locationQuery}/{units?}',
  handler: (request, reply) => {
    let units = 'us';
    if (request.params.units) {
      if (request.params.units === 'us' || request.params.units === 'si') units = request.params.units;
      else {
        reply('Invalid units specified: must be \'us\' (imperical), \'si\' (standard), or empty (defaults to imperical)').code(400);
        return;
      }
    }

    geocode(request.params.locationQuery)
      .then(geocodeResponse => {
        forecast(geocodeResponse.lat, geocodeResponse.lng, units)
          .then(forecastResponse => {
            reply({
              location: geocodeResponse,
              weather: forecastResponse,
            });
          })
          .catch(err => reply(err).code(500));
      })
      .catch(err => {
        if (err.message && err.code) {
          reply(err.message).code(err.code);
          return;
        }
        reply(err).code(500);
      });
  },
});

weathr.start(err => {
  if (err) throw err;
  console.log(`Server running at ${weathr.info.uri}`);
});
