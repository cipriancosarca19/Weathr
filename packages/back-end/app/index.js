'use strict';

const Hapi = require('hapi');
const API = require('./api');
const log = require('./log');

log.silly('Welcome to Weathr\'s back-end service!');
const weathr = new Hapi.Server();
weathr.connection({
  port: process.env.PORT || 2999,
  host: '0.0.0.0',
  routes: { cors: true },
});
log.verbose(`Instantiated Hapi.js server on port: ${process.env.PORT}`);

/**
 * Primary forecast route
 * 
 * Uses Google Maps' API to geocode and DarkSky's
 * API to fetch location forecast information, and
 * returns it to the client.
 * 
 * @param  {string} locationQuery
 * @param  {string} units (optinal)
 * @return {object}
 */
weathr.route({
  method: 'GET',
  path: '/forecast/{locationQuery}/{units?}',
  handler: (request, reply) => {
    log.verbose(`GET: ${request.url.path}`);

    let units = 'us';
    if (request.params.units) {
      if (request.params.units === 'us' || request.params.units === 'si') units = request.params.units;
      else {
        log.error(`Invalid units specified '${request.params.units}'`);
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
            log.error(err);
            reply(err).code(500);
            return;
          });
      })
      .catch(err => {
        if (err.message && err.code) {
          log.error(err.message);
          reply(err.message).code(err.code);
          return;
        }
        log.error(err);
        reply(err).code(500);
        return;
      });
  },
});
log.verbose('Setup server route: /forecast/{locationQuery}/{units?}');

/**
 * Location autocomplete route
 * 
 * Uses Google Places' Autocomplete API to fetch
 * location query predictions, and returns them
 * to the client for better UX.
 * 
 * @param  {string} locationQuery
 * @return {object}
 */
weathr.route({
  method: 'GET',
  path: '/autocomplete/{locationQuery}',
  handler: (request, reply) => {
    log.verbose(`GET: ${request.url.path}`);

    API.autocomplete(request.params.locationQuery)
      .then(autocompleteResponse => {
        reply(autocompleteResponse);
      })
      .catch(err => {
        if (err.message && err.code) {
          log.error(err.message);
          reply(err.message).code(err.code);
          return;
        }
        log.error(err);
        reply(err).code(500);
        return;
      });
  }
});
log.verbose('Setup server route: /autocomplete/{locationQuery}');

weathr.start(err => {
  if (err) throw err;
  log.info(`Hapi.js server started at ${weathr.info.uri}`);
});
