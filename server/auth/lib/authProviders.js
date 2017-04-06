const ObjectId = require('mongodb').ObjectId

module.exports = {
  standardizeProfile(credentials) {
    let base = {}
    switch (credentials.provider) {
      case 'slack':
        base = {
          name: credentials.profile.user,
          id: credentials.profile.user_id,
        }
        break
      case 'guest':
        base = {
          name: credentials.name,
          id: ObjectId().toString(),
        }
        break
      default:
        base = {
          name: credentials.profile.user,
          id: credentials.profile.user_id,
        }
        break
    }
    return Object.assign({}, base, { provider: credentials.provider })
  },
}
