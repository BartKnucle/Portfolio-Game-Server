const ServiceClass = require('../service.class')

class Message {
  constructor (data) {
    this.time = new Date().getTime()
    this.data = data
  }
}

exports.Messages = class Messages extends ServiceClass {
  setup (app) {
    this.app = app
    this.sockets = []

    app.gameServer.on('connection', (socket) => {
      socket.startedAt = new Date().getTime()
      this.sockets.push(socket)

      socket.on('message', (data) => {
        const msg = new Message(JSON.parse(Buffer.from(data).toString()))
        msg.socket = socket

        this.app.service(msg.data.service).receive(msg)
      })

      socket.on('close', () => {
        if (socket.userId) {
          this.app.service('/api/users').setOffline(socket.userId)
        }

        this.sockets = this.sockets.filter(s => s !== socket)
      })
    })
  }

  send (userId, data) {
    const message = new Message(data)
    this.sockets.find(socket => socket.userId === userId).send(JSON.stringify(message))
  }
}
