/*
 * A hook to update a record instead of creating a new one, based on an array of keys
 */
module.exports = function () { // eslint-disable-line no-unused-vars
  return function (hook) {
    const query = {
      _id: hook.data._id
    }

    return hook.service.find({ query }).then((page) => {
      if (page.total !== 0) {
        hook.service.patch(hook.data._id, hook.data)
        hook.result = page.data[0]
      }
      return Promise.resolve(hook)
    })
  }
}
