const axios = require('axios');
const log = require('./log');

const buildAutocompleteURL = locationQuery =>
  `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDjh11j9IJHALxDJd4z--VMuTLpAEbANyA&input=${locationQuery}`;
const buildGeocodeURL = locationQuery =>
  `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDjh11j9IJHALxDJd4z--VMuTLpAEbANyA&address=${locationQuery}`;
const buildForecastURL = (lat, lng, units) =>
  `https://api.darksky.net/forecast/9c05b6662a30448a33162cc584b4a264/${lat},${lng}?units=${units}&exclude=[minutely,hourly,alerts,flags]`;

const buildGoogleError = (status, locationQuery) => {
  let message;
  let code;

  switch (status) {
    case 'OVER_QUERY_LIMIT':
      message = 'Query limit reached: Google Maps API\'s query limit has been reached';
      code = 403;
      break;
    case 'ZERO_RESULTS':
      message = `Location not found: the query ${locationQuery} yielded no results`;
      code = 404;
      break;
    default:
      message = 'Unknown server error: Google Maps API may be down or not functional';
      code = 500;
      break;
  }

  return {
    message,
    code,
  };
};

const autocomplete = locationQuery =>
  new Promise((resolve, reject) => {
    const autocompleteURL = buildAutocompleteURL(locationQuery);
    log.verbose('Sending autocomplete request...');
    log.silly(`Autocomplete URL: ${autocompleteURL}`);

    axios.get(autocompleteURL)
      .then(response => {
        const status = response.data.status;
        if (status !== 'OK') {
          const { message, code } = buildGoogleError(status, locationQuery);
          log.error(`Autocomplete request failed: ${message} [${code}]!`);

          reject({
            message,
            code,
          });
        }

        const result = {
          predictions: response.data.predictions,
        };
        log.verbose('Autocomplete request succeeded!');
        log.silly(`Autocomplete response: ${JSON.stringify(result)}`);

        resolve(result);
      })
      .catch(err => {
        log.error(err);
        reject(err);
      });
  });

const geocode = locationQuery =>
  new Promise((resolve, reject) => {
    const geocodeURL = buildGeocodeURL(locationQuery);
    log.verbose('Sending geocode request...');
    log.silly(`Geocode URL: ${geocodeURL}`);

    axios.get(geocodeURL)
      .then(response => {
        const status = response.data.status;
        if (status !== 'OK') {
          const { message, code } = buildGoogleError(status, locationQuery);
          log.error(`Geocode request failed: ${message} [${code}]!`);

          reject({
            message,
            code,
          });
        }

        const result = {
          address: response.data.results[0].formatted_address,
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        };
        log.verbose('Geocode request succeeded!');
        log.silly(`Geocode response: ${JSON.stringify(result)}`);

        resolve(result);
      })
      .catch(err => {
        log.error(err);
        reject(err);
      });
  });

const forecast = (lat, lng, units) =>
  new Promise((resolve, reject) => {
    const forecastURL = buildForecastURL(lat, lng, units);
    log.verbose('Sending forecast request...');
    log.silly(`Forecast URL: ${forecastURL}`);

    axios.get(forecastURL)
      .then(response => {
        const result = {
          currently: response.data.currently ? response.data.currently : null,
          daily: response.data.daily ? response.data.daily : null,
        };
        log.verbose('Forecast request succeeded!');
        log.silly(`Forecast response: ${JSON.stringify(result)}`);

        resolve(result);
      })
      .catch(err => {
        log.error(err);
        reject(err);
      });
  });

module.exports = {
  autocomplete,
  geocode,
  forecast,
};
