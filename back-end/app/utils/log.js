const winston = require('winston');

const LOG_LEVEL = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? 'silly' : 'info';

const log = new (winston.Logger)({
  level: LOG_LEVEL,
  transports: [
    new (winston.transports.Console)({
      silent: process.env.NODE_ENV === 'test' ? true : false,
    }),
    new (winston.transports.File)({
      name: 'server.log',
      filename: 'log/server.log',
    }),
    new (winston.transports.File)({
      name: 'error.log',
      filename: 'log/error.log',
      level: 'error',
    })
  ],
});

module.exports = log;
