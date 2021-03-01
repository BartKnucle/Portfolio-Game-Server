const upsert = require('../../hooks/upsert')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [upsert],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
