const ServiceClass = require('../service.class')
exports.Messages = class Messages extends ServiceClass {
  setup (app) {
    this.app = app
    app.gameServer.on('connection', (socket) => {
      socket.on('message', (msg) => {
        this.dispatch(socket, Buffer.from(msg).toString())
      })

      socket.on('close', () => {
        if (socket.playerId) {
          this.app.service('/api/players').disconnect(socket.playerId)
        }
      })
    })
  }

  dispatch (socket, msg) {
    const msgs = msg.split('/')
    this.app.service(`/${msgs[0]}/${msgs[1]}`)[msgs[2]](msgs.slice(3), socket)
  }
}
