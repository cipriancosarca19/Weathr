const axios = require('axios');
const log = require('./log');

const buildGeocodeURL = locationQuery =>
  `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDjh11j9IJHALxDJd4z--VMuTLpAEbANyA&address=${locationQuery}`;
const buildForecastURL = (lat, lng, units) =>
  `https://api.darksky.net/forecast/9c05b6662a30448a33162cc584b4a264/${lat},${lng}?units=${units}`;

const geocode = locationQuery =>
  new Promise((resolve, reject) => {
    const geocodeURL = buildGeocodeURL(locationQuery);
    log.extra(`[API]: Making geocode request with '${geocodeURL}'`);

    axios.get(geocodeURL)
      .then(response => {
        const status = response.data.status;
        if (status !== 'OK') {
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

          log.error(`[API]: Geocode request failed: ${message}`);
          reject({
            message,
            code,
          });
        }

        log.success(`[API]: Geocode request succeeded`)
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
        log.success(`[API]: Forecast request succeeded`)
        resolve({
          currently: response.data.currently ? response.data.currently : null,
          minutely: response.data.minutely ? response.data.minutely : null,
          hourly: response.data.hourly ? response.data.hourly : null,
          daily: response.data.daily ? response.data.daily : null,
        });
      })
      .catch(err => reject(err));
  });

module.exports = {
  geocode,
  forecast,
};
