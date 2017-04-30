// @flow
import computeColors from '.'

const colors = {
  primary:   '#79589f',
  secondary: '#596981',
  tertiary:  '#e3e7ef',
  blue:      '#408fec',
  white:     '#FFFFFF',
}

describe('computeColors', () => {
  it('works', () => {
    const actual = computeColors(colors)
    expect(actual).toMatchSnapshot()
  })
})
