'use strict';

const Hapi = require('hapi');
const log = require('log');
const Request = require('Request');

log.silly('Welcome to Weathr\'s back-end service!');
const weathr = new Hapi.Server({
  port: process.env.PORT || 2999,
  host: '0.0.0.0',
  routes: { cors: true },
});

/**
 * Primary forecast route
 *
 * Uses Google Maps' API to geocode and DarkSky's
 * API to fetch location forecast information, and
 * returns it to the client.
 *
 * @param  {string} query
 * @return {object}
 */
weathr.route({
  method: 'GET',
  path: '/forecast/{query}',
  handler: async (request, h) => {
    let geocodeResponse;
    let forecastResponse;

    try {
      geocodeResponse = await Request.geocode(request.params.query);
    } catch(error) {
      log.error(error);
      return error;
    }

    try {
      forecastResponse = await Request.forecast(geocodeResponse.lat, geocodeResponse.lng);
    } catch(error) {
      log.error(error);
      return error;
    }

    return {
      location: geocodeResponse,
      weather: forecastResponse,
    };
  },
});

/**
 * Location autocomplete route
 *
 * Uses Google Places' Autocomplete API to fetch
 * location query predictions, and returns them
 * to the client for better UX.
 *
 * @param  {string} query
 * @return {object}
 */
weathr.route({
  method: 'GET',
  path: '/autocomplete/{query?}',
  handler: async (request, h) => {
    if (!request.params.query) {
      // Better identify this case on the front-end
      return "Route left open due to front-end implementation. Please use '/autocomplete/{query}' for actual autocomplete";
    }

    let autocompleteResponse;

    try {
      autocompleteResponse = Request.autocomplete(request.params.query);
    } catch(error) {
      log.error(error);
      return error;
    }

    return autocompleteResponse;
  },
});

(async () => {
  try {
    await weathr.start();
  } catch (error) {
    log.error(error);
  }
})();
