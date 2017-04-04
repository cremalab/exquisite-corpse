const urlPrefix = `/lobby`

const types = {
  USERS_CHANGE: 'usersChange',
  CORPSE_CHANGE: 'corpseChange',
  CHAT_MESSAGE: 'chatMessage',
}

module.exports = {
  users: [],
  registerSubscription(server) {
    server.subscription(`${urlPrefix}`)
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
  connectUser(server, credentials) {
    const { id, name } = credentials
    const existing = this.users.find(u => u.id === id)
    if (!existing) {
      this.users = this.users.concat({ id, name })
    }
    this.notifyUserChange(server)
  },
  disconnectUser(server, credentials) {
    const { id } = credentials
    this.users = this.users.filter(u => u.id !== id)
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
