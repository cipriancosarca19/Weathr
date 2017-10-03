const winston = require('winston');

const log = new (winston.Logger)({
  level: process.env.NODE_ENV === 'development' ? 'silly' : 'info',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      name: 'server.log',
      filename: 'log/server.log'
    }),
    new (winston.transports.File)({
      name: 'error.log',
      filename: 'log/error.log',
      level: 'error',
    })
  ],
});

module.exports = log;
