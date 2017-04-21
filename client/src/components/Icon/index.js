import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as icons from 'assets/icons'

const Svg = styled.svg`
  width: 1.3em;
  height: 1.3em;
  margin: -0.15em 0;
  fill: currentColor;
  vertical-align: top;
`

const Icon = ({ glyph }) => icons[glyph]

Icon.propTypes = {
  glyph: PropTypes.node
}

export default Icon
