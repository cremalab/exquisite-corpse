const eventParser = require('./eventParser')
const urlPrefix = `/lobby`

const types = {
  USERS_CHANGE: 'usersChange',
  CORPSE_CHANGE: 'corpseChange',
  CHAT_MESSAGE: 'chatMessage',
  USER_STATUS_CHANGE: 'userStatusChange',
  GENERIC_EVENT: 'genericEvent'
}

const pruneInt = 10000 // 10 second loop to clean up disconnected users

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
    setInterval(() => this.pruneUsers(server), pruneInt)
  },
  pruneUsers(server) {
    let socketIds = []
    server.eachSocket((socket) => {
      socketIds.push(socket.id)
    }, {
      subscription: '/lobby',
    })
    this.users = this.users.filter(u => socketIds.indexOf(u.socketId) > -1)
    this.notifyUserChange(server)
  },
  notifyUserChange(server) {
    server.publish(`${urlPrefix}`, {
      type: types.USERS_CHANGE, data: this.users,
    })
  },
  notifyStatusChange(server, credentials) {
    const { id, name, status } = credentials
    const existing = this.users.find(u => u.id === id)
    if (!existing) return

    if (existing.status !== credentials.status) {
      const data = {
        timestamp: new Date().toISOString(),
        name,
        id,
        status,
      }
      server.publish(urlPrefix, {
        type: types.USER_STATUS_CHANGE,
        data,
      })
    }
  },
  notifyEvent(server, eventType, data) {
    console.log(eventType);
    console.log(data);
    const msg = eventParser.toMessage(eventType, data)
    console.log('message', msg);
    server.publish(urlPrefix, {
      type: types.GENERIC_EVENT,
      data: msg,
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
    this.notifyStatusChange(server, credentials, socketId)
    this.users = updateObjectInArray(this.users, credentials, socketId)
    this.notifyUserChange(server)
  },
  disconnectUser(server, identifier) {
    // by socketId or user ID
    if (typeof identifier === ('object')) {
      this.users = this.users.filter(u => u.id !== identifier.id)
    } else {
      this.users = this.users.filter(u => u.socketId !== identifier)
    }
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
