//  const setup = require('./setup/service')
const logger = require('./logger/service')
const users = require('./users/service')
const authentication = require('./authentication/service')
const messages = require('./messages/service')
const lobby = require('./lobby/service')
const games = require('./games/service')
const players = require('./players/service')

module.exports = function (app) {
  //  app.configure(setup)
  app.configure(logger)
  app.configure(users)
  app.configure(authentication)
  app.configure(messages)
  app.configure(lobby)
  app.configure(games)
  app.configure(players)
}
