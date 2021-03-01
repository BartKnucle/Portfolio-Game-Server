const { hashPassword } = require('@feathersjs/authentication-local').hooks

// Add a device at user creation
const addDevice = (options = {}) => {
  return (context) => {
    if (context.result.type === 'device') {
      context.app.service('/api/devices').create({
        _id: context.result._id,
        online: true
      })
        .catch((err) => {
          return err
        })
    }
    return context
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword('password')],
    update: [hashPassword('password')],
    patch: [hashPassword('password')],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addDevice()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
