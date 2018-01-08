const test = require('ava');
const Request = require('Request');

test('make an autocomplete request to Google Places API', async t => {
  const response = await Request.autocomplete('Cincinnati');
  t.is(response.status, 'OK');
});

test('make a geocode request to Google Maps API', async t => {
  const response = await Request.geocode('Cincinnati+OH+USA');
  t.is(response.status, 'OK');
});

test('make a forecast request to DarkSky API', async t => {
  const response = Request.forecast(39.1031182, -84.5120196);
  t.is(response.status, 'DING DONG?');
});
