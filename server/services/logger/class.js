const ServiceClass = require('../service.class')

exports.Logger = class Logger extends ServiceClass {
  setup (app) {
    this.level = 2
    app.log = this.log.bind(this)
    super.setup(app)
  }

  log (err, lvl) {
    if (lvl >= this.level) {
      this.create({
        err,
        lvl
      })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log(err)
    }
  }
}
