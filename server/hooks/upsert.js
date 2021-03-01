module.exports = (options = {}) => {
  return (context) => {
    context.app.service(context.path).get(context.data._id)
      .then((value) => {
        console.log(value)
      })
      .catch((err) => {
        console.log(err)
      })
    return context
  }
}
