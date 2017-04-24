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

export const statusToBackground = (status, i) => {
  switch(status) {
    case 'available':
      return 'white'
    case 'claimed':
      return `
        background-image: -webkit-repeating-radial-gradient(center center, ${colors['primary-tint-5']}, ${colors['primary-tint-5']} 1px, transparent 1px, transparent 100%);
        background-size: 3px 3px;
      `
    case 'complete':
      return `
        ${ i !== 0 ? `border-top: 2px solid ${colors['primary']};` : `` }
        background-color: ${colors['primary-shade-2']};
      `
    default:
      return 'white'
  }
}
