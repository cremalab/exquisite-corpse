import { colors } from 'config/styles'

export const background = props => {
  switch(props.skin) {
    case 'secondary':
      return colors.secondary
    case 'tertiary':
      return colors.tertiary
    default:
      return colors.primary
  }
}

export const color = props => {
  switch(props.skin) {
    case 'secondary':
      return colors.white
    case 'tertiary':
      return colors.gray
    default:
      return colors['white']
  }
}
