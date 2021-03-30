//  const updated = require('./hooks/updated')

const upsert = require('./hooks/upsert')

// Global feathers Hooks
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [upsert()],
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
