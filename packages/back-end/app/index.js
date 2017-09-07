'use strict';

const Hapi = require('hapi');

const weathr = new Hapi.Server();

weathr.connection({
  port: 3001,
  host: '0.0.0.0',
});
weathr.start(err => {
  if (err) throw err;
  console.log(`Server running at ${weathr.info.uri}`);
});
