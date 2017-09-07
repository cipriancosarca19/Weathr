'use strict';

const Hapi = require('hapi');

const weathr = new Hapi.Server();

const getGeocodeUrl = query =>
  `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDjh11j9IJHALxDJd4z--VMuTLpAEbANyA&address=${query}`;
const getForecastURL = (lat, long) =>
  `https://api.darksky.net/forecast/9c05b6662a30448a33162cc584b4a264/${lat},${long}`;

weathr.connection({
  port: 3001,
  host: '0.0.0.0',
});

weathr.route({
  method: 'GET',
  path: '/weathr/{query}',
  handler: (request, reply) => {
    reply(`TODO: Geocode ${request.params.query}, then get and reply with the forecast`);
  },
});

weathr.start(err => {
  if (err) throw err;
  console.log(`Server running at ${weathr.info.uri}`);
});
