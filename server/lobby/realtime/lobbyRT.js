const urlPrefix = `/lobby`

const types = {
  USERS_CHANGE: 'usersChange',
  CORPSE_CHANGE: 'corpseChange',
}

const users = []

module.exports = {
  registerSubscription(server) {
    server.subscription(`${urlPrefix}`)
  },
  notifyUserChange(server) {
    server.publish(`${urlPrefix}`, {
      type: types.USERS_CHANGE, data: this.connectUsers,
    })
  },
  notifyCorpseChange(server, payload) {
    server.publish(`${urlPrefix}`, {
      type: types.CORPSE_CHANGE, data: payload,
    })
  },
  connectUser(server, credentials) {
    const { user_id, user } = credentials.profile
    const existing = users.find(u => u.id === user_id)
    if (!existing) {
      users.push({ id: user_id, name: user })
    }
    this.notifyUserChange(server)
  },
  users,
}
