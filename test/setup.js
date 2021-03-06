const mocha = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const winston = require('winston');

mocha.before(() => {
  chai.use(sinonChai);

  // we want to have logger.test() without flooding the console with other levels' messages
  winston.setLevels({
    debug: 5,
    info: 4,
    warning: 3,
    error: 2,
    critical: 1,
    test: 0,
  });
  winston.addColors({
    debug: 'green',
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    critical: 'red',
    test: 'blue',
  });
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console, { level: process.env.LOGGER_LEVEL || 'test', colorize: true });
});

mocha.beforeEach(function beforeEach() {
  this.sandbox = sinon.sandbox.create();
});

mocha.afterEach(function afterEach() {
  this.sandbox.restore();
});
