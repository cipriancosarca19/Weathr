const axios = require('axios');
const URLBuilder = require('URLBuilder');
const log = require('./log');

function resolveGoogleError(status, query) {
  const error = {};

  switch(status) {
    case 'OVER_QUERY_LIMIT':
      error.message = `${status}: Google API query limit reached`;
      error.code = 403;
      break;
    case 'ZERO_RESULTS':
      error.message = `${status}: Google API failed to locate using query '${query}'`;
      error.code = 404;
      break;
    default:
      error.message = `${status}: unknown server error; Google API may be down`;
      error.code = 500;
      break;
  }

  return error;
}

async function autocomplete(query) {
  log.verbose('Initiating autocomplete request...');

  let reqURL;
  try {
    reqURL = URLBuilder.autocomplete(query);
    log.silly('Built autocomplete request URL', { reqURL });
  } catch(error) {
    log.error('Failed to build autocomplete request URL', { reason: error.message });
    return;
  }

  const response = await axios.get(reqURL);

  if (response.data.status !== 'OK') {
    const gError = resolveGoogleError(response.data.status, query);
    log.error('Autocomplete request failed', gError);

    const error = new Error(gError.message);
    error.code = gError.code;
    throw error;

    return;
  }

  log.info('Autocomplete request completed successfully');
  log.silly('Autocomplete request completed', reqURL, response.data);

  return response.data;
}

async function geocode(query) {}

async function forecast(lat, lng) {}

module.exports = {
  autocomplete,
  geocode,
  forecast,
};
