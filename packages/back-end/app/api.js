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
    log.extra(`[API]: Making autocomplete request with '${autocompleteURL}'`);

    axios.get(autocompleteURL)
      .then(response => {
        const status = response.data.status;
        if (status !== 'OK') {
          const { message, code } = buildGoogleError(status, locationQuery);
          
          log.error(`[API]: Autocomplete request failed: ${message}`);
          reject({
            message,
            code,
          });

          return;
        }

        log.success(`[API]: Autocomplete request succeeded`);
        resolve({
          predictions: response.data.predictions,
        });
      })
      .catch(err => reject(err));
  });

const geocode = locationQuery =>
  new Promise((resolve, reject) => {
    const geocodeURL = buildGeocodeURL(locationQuery);
    log.extra(`[API]: Making geocode request with '${geocodeURL}'`);

    axios.get(geocodeURL)
      .then(response => {
        const status = response.data.status;
        if (status !== 'OK') {
          const { message, code } = buildGoogleError(status, locationQuery);

          log.error(`[API]: Geocode request failed: ${message}`);
          reject({
            message,
            code,
          });

          return;
        }

        log.success(`[API]: Geocode request succeeded`);
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
    const forecastURL = buildForecastURL(lat, lng, units);
    log.extra(`[API]: Making forecast request with '${forecastURL}'`);

    axios.get(forecastURL)
      .then(response => {
        log.success(`[API]: Forecast request succeeded`);
        resolve({
          currently: response.data.currently ? response.data.currently : null,
          daily: response.data.daily ? response.data.daily : null,
        });
      })
      .catch(err => reject(err));
  });

module.exports = {
  autocomplete,
  geocode,
  forecast,
};
