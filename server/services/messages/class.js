const ServiceClass = require('../service.class')
exports.Messages = class Messages extends ServiceClass {
  setup (app) {
    this.app = app
    app.gameServer.on('connection', (socket) => {
      socket.on('message', (msg) => {
        this.dispatch(socket, Buffer.from(msg).toString())
      })

      socket.on('close', (socket) => {
        if (socket.playerId) {
          this.app.service('/api/players').update(socket.playerId, {
            _id: socket.playerId,
            online: false
          }, { nedb: { upsert: true } })
        }
      })
    })
  }

  dispatch (socket, msg) {
    const msgs = msg.split('/')

    if (socket.playerId) {
      switch (msgs[0]) {
        case 'network':
          switch (msgs[1]) {
            case 'joinLobby':
              this.app.service('/api/lobby').update(socket.playerId, {
                _id: socket.playerId,
                team: msgs[2]
              })
              break
            default:
              break
          }
          break
        default:
          break
      }
    } else if (msgs[0] === 'player' && msgs[1] === 'sendId') {
      socket.playerId = msgs[2]
      //  this.app.service('/api/players').create({ _id: socket.playerId })
      this.app.service('/api/players').update(socket.playerId, {
        _id: socket.playerId,
        online: true
      }, { nedb: { upsert: true } })
    }
  }
}
