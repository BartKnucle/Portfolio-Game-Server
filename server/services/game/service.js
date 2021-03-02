
const createModel = require('../../models/game.model')
const { Game } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/game', new Game(options, app))
  const service = app.service('/api/game')

  service.hooks(hooks)
}
