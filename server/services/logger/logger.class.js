const ServiceClass = require('../service.class')

exports.Logger = class Logger extends ServiceClass {
  setup (app) {
    app.service('/api/setup').on('started', () => {
      app.log = (log) => {
        if (log.level >= app.get('logLevel')) {
          this.create(log)
        }
      }
      super.setup(app)
    })
  }
}
