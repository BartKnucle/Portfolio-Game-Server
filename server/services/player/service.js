
const createModel = require('../../models/player.model')
const { Player } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/player', new Player(options, app))
  const service = app.service('/api/player')

  service.hooks(hooks)
}
