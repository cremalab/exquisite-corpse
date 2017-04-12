const urlPrefix = `/lobby`

const types = {
  USERS_CHANGE: 'usersChange',
  CORPSE_CHANGE: 'corpseChange',
  CHAT_MESSAGE: 'chatMessage',
}

function updateObjectInArray(array, user, socketId) {
  if (array.find(item => item.socketId === socketId)) {
    return array.map((item) => {
      if (item.socketId !== socketId) {
        return item
      }
      return Object.assign({}, item, user)
    })
  }

  return [...array, user]
}

module.exports = {
  users: [],
  registerSubscription(server) {
    const lib = this
    server.subscription(`${urlPrefix}`, {
      onUnsubscribe(socket, path, params, next) {
        lib.disconnectUser(server, socket.id)
        next()
      },
      onSubscribe(socket, path, params, next) {
        lib.connectUser(server, socket.auth.credentials, socket.id)
        next()
      }
    })
  },
  notifyUserChange(server) {
    server.publish(`${urlPrefix}`, {
      type: types.USERS_CHANGE, data: this.users,
    })
  },
  notifyCorpseChange(server, payload) {
    server.publish(`${urlPrefix}`, {
      type: types.CORPSE_CHANGE, data: payload,
    })
  },
  connectUser(server, credentials, socketId) {
    const { credentials: { id, name } } = credentials
    const existing = this.users.find(u => u.id === id)
    const status = `idle`
    if (!existing) {
      this.users = this.users.concat({ id, name, socketId, status })
    }
    this.notifyUserChange(server)
  },
  updateUser(server, credentials, socketId) {
    this.users = updateObjectInArray(this.users, credentials, socketId)
    this.notifyUserChange(server)
  },
  disconnectUser(server, socketId) {
    this.users = this.users.filter(u => u.socketId !== socketId)
    this.notifyUserChange(server)
  },
  notifyChatMessage(server, profile, content) {
    const message = {
      name: profile.name,
      id: profile.id,
      timestamp: new Date().toISOString(),
      content,
    }
    server.publish(urlPrefix, {
      type: types.CHAT_MESSAGE,
      data: message,
    })
  },
}
