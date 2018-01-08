const test = require('ava');
const Request = require('Request');

test('make an autocomplete request to Google Places API', t => {
  const expectedData = {};
  Request.autocomplete('Cincinnati')
    .then(data => {
      t.deepEqual(data, expectedData);
    });
});

test('make a geocode request to Google Maps API', t => {
  const expectedData = {};
  Request.geocode('Cincinnati+OH+USA')
    .then(data => {
      t.deepEqual(data, expectedData);
    });
});

test('make a forecast request to DarkSky API', t => {
  const expectedData = {};
  Request.forecast(39.1031182, -84.5120196)
    .then(data => {
      t.deepEqual(data, expectedData);
    });
});
