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
