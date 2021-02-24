const setup = require('./setup/setup.service')
const logger = require('./logger/logger.service')
const users = require('./users/users.service')
const authentication = require('./authentication/authentication.service')

module.exports = function (app) {
  app.configure(setup)
  app.configure(logger)
  app.configure(users)
  app.configure(authentication)
}
