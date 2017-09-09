const chalk = require('chalk');

module.exports = {
  info(message) {
    console.log(chalk.white(message));
  },
  success(message) {
    console.log(chalk.green.bold(message));
  },
  error(message) {
    console.log(chalk.red.bold(message));
  },
  extra(message) {
    console.log(chalk.gray(message));
  }
};
