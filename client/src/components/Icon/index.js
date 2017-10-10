import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as icons from 'assets/icons'

const Svg = styled.svg`
  width: ${p => p.size || '1.3em'};
  height: ${p => p.size || '1.3em'};
  margin: -0.15em 0;
  fill: currentColor;
  vertical-align: top;
`

const Icon = ({ glyph, size }) =>
  <Svg
    size={ size }
    dangerouslySetInnerHTML={{__html: '<use xlink:href="' + icons[glyph] + '"></use>'}}
  />


Icon.propTypes = {
  glyph: PropTypes.node,
  color: PropTypes.string,
  size: PropTypes.string,
}

export default Icon
