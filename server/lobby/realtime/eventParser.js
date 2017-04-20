const types = require('./eventTypes')

module.exports = {
  toMessage(eventType, data) {
    let content = ''
    let related = []
    let sectionName, corpse, drawing, name, id, credentials, section
    switch (eventType) {
      case types.DRAWING_STARTED:
        credentials = data.credentials
        section = data.section
        corpse = data.corpse
        drawing = data.drawing
        sectionName = corpse.sections.find(s => String(s._id) === String(section)).description
        content = `${credentials.name} started drawing ${sectionName} for ${corpse.creator.name}'s corpse`
        related = [
          { primary: true, type: 'drawing', id: drawing},
          { linked: true, type: 'corpse', id: corpse._id },
          { type: 'actor', id: credentials._id, name: credentials.name },
          { type: 'user', id: corpse.creator.id, name: corpse.creator.name },
        ]
        break
      case types.DRAWING_CANCELLED:
        credentials = data.credentials
        section = data.section
        corpse = data.corpse
        drawing = data.drawing
        name = credentials.name
        id = credentials.id
        sectionName = corpse.sections.find(s => String(s._id) === String(section)).description
        content = `${name} quit drawing ${sectionName} for ${corpse.creator.name}'s corpse`
        related = [
          { primary: true, type: 'drawing', id: null},
          { linked: true, type: 'corpse', id: corpse._id },
          { type: 'actor', id, name },
          { type: 'user', id: corpse.creator.id, name: corpse.creator.name },
        ]
        break
      case types.DRAWING_COMPLETED:
        credentials = data.credentials
        section = data.section
        corpse = data.corpse
        drawing = data.drawing
        name = credentials.name
        id = credentials.id
        sectionName = corpse.sections.find(s => String(s._id) === String(section)).description
        content = `${name} finished drawing ${sectionName} for ${corpse.creator.name}'s corpse`
        related = [
          { primary: true, type: 'drawing', id: drawing },
          { linked: true, type: 'corpse', id: corpse._id },
          { type: 'actor', id, name },
          { type: 'user', id: corpse.creator.id, name: corpse.creator.name },
        ]
        break
      case types.DRAWING_EXPIRED:
        credentials = data.creator
        section = data.section
        corpse = data.corpse
        name = credentials.name
        id = credentials.id
        content = `A drawing started by ${name} has expired`
        related = [
          { primary: true, type: 'drawing', id: data._id },
          { linked: true, type: 'corpse', id: corpse },
          { type: 'user', id: credentials.id, name: credentials.name },
        ]
        break
      case types.CORPSE_CREATED:
        credentials = data.credentials
        corpse = data.corpse
        name = credentials.name
        id = credentials.id
        content = `${name} created a new corpse`
        related = [
          { linked: true, primary: true, type: 'corpse', id: corpse._id },
          { type: 'actor', id, name },
        ]
        break
      case types.CORPSE_COMPLETED:
        credentials = data.credentials
        corpse = data.corpse
        name = credentials.name
        id = credentials.id
        content = `${corpse.creator.name}'s corpse has been completed!`
        related = [
          { linked: true, primary: true, type: 'corpse', id: corpse._id },
          { type: 'actor', id, name },
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
      content,
      timestamp: new Date().toISOString(),
    }
  }
}
