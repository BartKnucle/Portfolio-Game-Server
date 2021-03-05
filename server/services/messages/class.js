const ServiceClass = require('../service.class')
exports.Messages = class Messages extends ServiceClass {
  setup (app) {
    this.app = app
    this.sockets = []

    app.gameServer.on('connection', (socket) => {
      this.sockets.push(socket)

      socket.on('message', (msg) => {
        this.dispatch(socket, Buffer.from(msg).toString())
      })

      socket.on('close', () => {
        if (socket.playerId) {
          this.app.service('/api/player').disconnect(socket.playerId)
          this.sockets = this.sockets.filter(s => s.playerId !== socket.playerId)
        }
      })
    })
  }

  // Dispatch the incoming messages
  dispatch (socket, msg) {
    const msgs = msg.split('/')
    this.app.service(`/${msgs[0]}/${msgs[1]}`)[msgs[2]](...msgs.slice(3), socket)
  }

  // Send a message to a player ID
  send (id, msg) {
    this.sockets.find(socket => socket.playerId === id).send(msg)
  }
}
