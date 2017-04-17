const types = require('./eventTypes')

module.exports = {
  toMessage(eventType, data) {
    let content = ''
    let related = []
    switch (eventType) {
      case types.DRAWING_STARTED:
        var { credentials: { name, id }, section, corpse, drawing } = data
        var sectionName = corpse.sections.find(s => String(s._id) === String(section)).description
        content = `${name} started drawing ${sectionName} for ${corpse.creator.name}'s corpse`
        related = [
          { primary: true, type: 'drawing', id: drawing},
          { type: 'corpse', id: corpse },
          { type: 'actor', id, name },
          { type: 'user', id: corpse.creator.id, name: corpse.creator.name },
        ]
        break
      default:
        content = ``
        break
    }
    return {
      id: 0,
      name: 'system',
      related,
      content
    }
  }
}
