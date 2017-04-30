// @flow
import computeColors from 'helpers/computeColors'

const colors = {
  'primary':   '#79589f',
  'secondary': '#596981',
  'tertiary':  '#c5d6f1',
  'danger':    '#fe4e17',
  'white':     '#f9fafb',
  'black':     '#1c1e22',
}

const config = {
  steps: 5,
  shift: 20
}

export default computeColors(colors, config)
