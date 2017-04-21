import Color from 'tinycolor2'

export default (colors, steps = 10, max = 40) =>
  Object.keys(colors).reduce((acc, color) => {
    const computedColors = [...Array(steps).keys()].reduce(
      (acc, step) => {
        const currentStep  = step + 1
        const currentColor = Color(colors[color]).toString()
        const amount       = currentStep * (max / steps)
        const tint         = Color(colors[color]).lighten(amount).toString()
        const shade        = Color(colors[color]).darken(amount).toString()
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
