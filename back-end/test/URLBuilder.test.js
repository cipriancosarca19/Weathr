const test = require('ava');
const URLBuilder = require('URLBuilder');

const runBuilder = (t, builder, expectedURL, ...rest) => {
  t.is(builder(...rest), expectedURL);
};

const breakBuilder = (t, builder, expectedMessage, ...rest) => {
  const error = t.throws(() => builder(...rest), TypeError);
  t.is(error.message, expectedMessage);
};

(() => {
  const query = 'Cincinnati+OH+US'
  const queryLat = 39.1031182;
  const queryLng = -84.5120196;

  test('build autocomplete request URL',
        runBuilder,
        URLBuilder.autocomplete,
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${URLBuilder.GMAPS_KEY}&input=${query}`,
        query);

  test('build geocode request URL',
        runBuilder,
        URLBuilder.geocode,
        `https://maps.googleapis.com/maps/api/geocode/json?key=${URLBuilder.GMAPS_KEY}&address=${query}`,
        query);

  test('build forecast request URL',
        runBuilder,
        URLBuilder.forecast,
        `https://api.darksky.net/forecast/${URLBuilder.DSKY_KEY}/${queryLat},${queryLng}?units=us&exclude=[minutely,hourly,alerts,flags]`,
        queryLat,
        queryLng);
})();

test('gracefully fail on invalid arg type while building autocomplete URL: boolean',
      breakBuilder,
      URLBuilder.autocomplete,
      `Incorrect query type 'boolean' (expected 'string')`,
      false);

test('gracefully fail on invalid arg type while building autocomplete URL: number',
      breakBuilder,
      URLBuilder.autocomplete,
      `Incorrect query type 'number' (expected 'string')`,
      420);

test('gracefully fail on invalid arg type while building geocode URL: boolean',
      breakBuilder,
      URLBuilder.geocode,
      `Incorrect query type 'boolean' (expected 'string')`,
      false);

test('gracefully fail on invalid arg type while building geocode URL: number',
      breakBuilder,
      URLBuilder.geocode,
      `Incorrect query type 'number' (expected 'string')`,
      420);

test('gracefully fail on invalid lat/lng types while building forecast URL: number/string',
      breakBuilder,
      URLBuilder.forecast,
      `Incorrect lat/lng types of 'number' and 'string' (expected 'number' for both)`,
      39.1031182,
      '-84.5120196');

test('gracefully fail on invalid lat/lng types while building forecast URL: boolean/number',
      breakBuilder,
      URLBuilder.forecast,
      `Incorrect lat/lng types of 'boolean' and 'number' (expected 'number' for both)`,
      true,
      -84.5120196);
