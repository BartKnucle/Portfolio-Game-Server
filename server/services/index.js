//  const setup = require('./setup/service')
const logger = require('./logger/service')
const users = require('./users/service')
const authentication = require('./authentication/service')
const player = require('./player/service')
const messages = require('./messages/service')
const lobby = require('./lobby/service')
const game = require('./game/service')

module.exports = function (app) {
  //  app.configure(setup)
  app.configure(logger)
  app.configure(users)
  app.configure(authentication)
  app.configure(player)
  app.configure(messages)
  app.configure(lobby)
  app.configure(game)
}
