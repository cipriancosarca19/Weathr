const log = require('log');

const GMAPS_KEY = 'AIzaSyAdmQXE-SDOEyletotMAFGD7ryYmNCtEUk';
const DSKY_KEY = '9c05b6662a30448a33162cc584b4a264';

function checkQueryType(query) {
  if (typeof query !== 'string') {
    const errorMessage = `Incorrect query type '${typeof query}' (expected 'string')`;
    log.error(errorMessage, { query });
    throw new TypeError(errorMessage);

    return false;
  }

  return true;
}

function autocomplete(query) {
  log.silly(`Building autocomplete request URL with query '${query}'...`);

  if (!checkQueryType(query)) return;

  const autocompleteURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GMAPS_KEY}&input=${query}`;
  log.silly('Autocomplete request URL built successfully', { autocompleteURL });

  return autocompleteURL;
}

function geocode(query) {
  log.silly(`Building geocode request URL with query '${query}'...`);

  if (!checkQueryType(query)) return;

  const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key=${GMAPS_KEY}&input=${query}`;
  log.silly('Geocode request URL built successfully', { geocodeURL });

  return geocodeURL;
}

function forecast(lat, lng) {
  log.silly(`Building forecast request URL with lat/lng '${lat}/${lng}'...`);

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    const errorMessage = `Incorrect lat/lng types of '${typeof lat}' and '${typeof lng}' (expected 'number' for both)`;
    log.error(errorMessage, { lat, lng });
    throw new TypeError(errorMessage);

    return;
  }

  const forecastURL = `https://api.darksky.net/forecast/${DSKY_KEY}/${lat},${lng}?units=us&exclude=[minutely,hourly,alerts,flags]`;
  log.silly('Forecast request URL built successfully', { forecastURL });

  return forecastURL;
}

module.exports = {
  GMAPS_KEY,
  DSKY_KEY,

  autocomplete,
  geocode,
  forecast,
};
