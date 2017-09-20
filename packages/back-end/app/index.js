'use strict';

const Hapi = require('hapi');
const log = require('./log');
const API = require('./api');

const weathr = new Hapi.Server();
weathr.connection({
  port: process.env.PORT || 2999,
  host: '0.0.0.0',
});

weathr.route({
  method: 'GET',
  path: '/forecast/{locationQuery}/{units?}',
  handler: (request, reply) => {
    log.info(`[SERVER]: GET ${request.url.path}`);

    let units = 'us';
    if (request.params.units) {
      if (request.params.units === 'us' || request.params.units === 'si') units = request.params.units;
      else {
        log.error(`[API]: Invalid units specified '${request.params.units}'`);
        reply('Invalid units specified: must be \'us\' (imperical), \'si\' (standard), or empty (defaults to imperical)').code(400);
        return;
      }
    }

    API.geocode(request.params.locationQuery)
      .then(geocodeResponse => {
        API.forecast(geocodeResponse.lat, geocodeResponse.lng, units)
          .then(forecastResponse => {
            reply({
              location: geocodeResponse,
              weather: forecastResponse,
            });
          })
          .catch(err => {
            reply(err).code(500)
          });
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

weathr.route({
  method: 'GET',
  path: '/autocomplete/{locationQuery}',
  handler: (request, reply) => {
    log.info(`[SERVER]: GET ${request.url.path}`);

    API.autocomplete(request.params.locationQuery)
      .then(autocompleteResponse => {
        reply(autocompleteResponse);
      })
      .catch(err => {
        if (err.message && err.code) {
          reply(err.message).code(err.code);
          return;
        }
        reply(err).code(500);
      });
  }
})

weathr.start(err => {
  if (err) throw err;
  log.extra(`[SERVER]: Running at ${weathr.info.uri}`);
});
