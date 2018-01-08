'use strict';

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
  } catch(error) {
    log.error('Failed to build autocomplete request URL', { reason: error.message });
    return;
  }

  const response = await axios.get(reqURL);

  if (response.data.status !== 'OK') {
    const gError = resolveGoogleError(response.data.status, query);
    log.error('Autocomplete request failed', { error: gError });

    const error = new Error(gError.message);
    error.code = gError.code;
    throw error;

    return error;
  }

  log.info('Autocomplete request completed successfully');
  log.silly('Autocomplete request completed', { reqURL, data: response.data });

  return response.data;
}

async function geocode(query) {
  log.verbose('Initiating geocode request...');

  let reqURL;
  try {
    reqURL = URLBuilder.geocode(query);
  } catch(error) {
    log.error('Failed to build geocode request URL', { reason: error.message });
    return;
  }

  const response = await axios.get(reqURL);

  if (response.data.status !== 'OK') {
    const gError = resolveGoogleError(response.data.status, query);
    log.error('Geocode request failed', { error: gError });

    const error = new Error(gError.message);
    error.code = gError.code;
    throw error;

    return error;
  }

  log.info('Geocode request completed successfully');
  log.silly('Geocode request completed', { reqURL, data: response.data });

  return response.data;
}

async function forecast(lat, lng) {
  log.verbose('Initiating forecast request...');

  let reqURL;
  try {
    reqURL = URLBuilder.forecast(lat, lng);
  } catch(error) {
    log.error('Failed to build forecast request URL', { reason: error.message });
    return;
  }

  const response = await axios.get(reqURL);

  if (response.statusText !== 'OK') {
    log.error('Forecast request failed', { error: {
      message: response.statusText,
      code: response.status,
    }});

    // TODO: Better handle DarkSky API errors
    throw new Error('Forecast request failed');

    return;
  }

  const results = {
    currently: response.data.currently ? response.data.currently : null,
    daily: response.data.daily ? response.data.daily : null,
    status: response.statusText,
  };

  return results;
}

module.exports = {
  autocomplete,
  geocode,
  forecast,
};
