import colors from 'config/colors'

export const sectionStatus = section => {
  if(section.drawer && (!section.drawing || !section.drawing.canvas)) {
    return 'claimed'
  } else if(section.drawing) {
    return 'complete'
  } else {
    return 'available'
  }
}

export const statusToLabel = status => {
  switch(status) {
    case 'available':
      return 'Open'
    case 'claimed':
      return 'In Progress'
    case 'complete':
      return 'Complete'
    default:
      return 'Waiting'
  }
}

export const statusToBackground = status => {
  switch(status) {
    case 'available':
      return 'white'
    case 'claimed':
      return `
        background-image: -webkit-repeating-radial-gradient(center center, ${colors['primary']}, ${colors['primary']} 1px, transparent 1px, transparent 100%);
        background-size: 3px 3px;
      `
    case 'complete':
      return `
        background-color: ${colors.primary}
      `
    default:
      return 'white'
  }
}
