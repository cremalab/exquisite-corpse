const urlPrefix = `/lobby`

const types = {
  USERS_CHANGE: 'usersChange',
  CORPSE_CHANGE: 'corpseChange',
}

module.exports = {
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
    const { user_id, user } = credentials.profile
    const existing = this.users.find(u => u.id === user_id)
    if (!existing) {
      this.users = this.users.concat({ id: user_id, name: user })
    }
    this.notifyUserChange(server)
  },
  disconnectUser(server, credentials) {
    const { user_id, user } = credentials.profile
    this.users = this.users.filter(u => u.id !== user_id)
    this.notifyUserChange(server)
  },
  users: [],
}
