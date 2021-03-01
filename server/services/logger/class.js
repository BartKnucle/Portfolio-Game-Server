const ServiceClass = require('../service.class')

exports.Logger = class Logger extends ServiceClass {
  setup (app) {
    app.log = this.log.bind(this)
    super.setup(app)
  }

  log (err) {
    console.log(err)
  }
}
