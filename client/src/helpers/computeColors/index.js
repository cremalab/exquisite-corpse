// @flow

import Color from 'tinycolor2'

type ColorMap = {
  [color: string | number]: string
}

type ConfigObj = {
  steps: number,
  shift: number
}

export default (colors: ColorMap, { steps = 10, shift = 40 }: ConfigObj = {}): Object =>
  Object.keys(colors).reduce((acc, color) => {
    const colorValue = colors[color]
    const computedColors = [...Array(steps).keys()].reduce(
      (acc, step) => {
        const currentStep  = step + 1
        const currentColor = Color(colorValue).toString()
        const amount       = currentStep * (shift / steps)
        const tint         = Color(colorValue).lighten(amount).toString()
        const shade        = Color(colorValue).darken(amount).toString()
        const white        = tint === '#ffffff'
        const black        = shade === '#000000'
        return {
          ...acc,
          [color]: currentColor,
          ...(white ? {} : { [`${color}-tint-${currentStep}`]: tint }),
          ...(black ? {} : { [`${color}-shade-${currentStep}`]: shade }),
        }
      },
      {}
    )
    return ({...acc, ...computedColors})
  }, {})
