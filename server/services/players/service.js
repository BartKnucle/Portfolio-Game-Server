
const createModel = require('../../models/players.model')
const { Players } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/players', new Players(options, app))
  const service = app.service('/api/players')

  service.hooks(hooks)
}
