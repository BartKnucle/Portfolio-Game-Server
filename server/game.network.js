const WebSocket = require('ws')

module.exports = (app) => {
  app.gameServer = new WebSocket.Server({
    port: 3000
  })

  app.gameServer.on('connection', (socket) => {})
}
