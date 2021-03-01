
const createModel = require('../../models/lobby.model')
const { Lobby } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/lobby', new Lobby(options, app))
  const service = app.service('/api/lobby')

  service.hooks(hooks)
}
