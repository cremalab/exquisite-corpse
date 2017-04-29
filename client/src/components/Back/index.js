// @flow
import React from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import Icon from 'components/Icon'
import spacing from 'config/spacing'
import styled from 'styled-components'

const A = styled.a`
  text-decoration: none;
`

const Back = ({ visible = false, onClick }) =>
  <A href='#' onClick={onClick}>
    <Box
      childDirection='row'
      childAlign='center'
      childSpacing={spacing[3]}
      css={`
        transition: all 0.25s ease-in-out;
        transform: translateX(${visible ? '0%' : '-100%'});
        opacity: ${visible ? 1 : 0};
      `}>
      <Icon glyph='back'/>
      Back
    </Box>
  </A>

Back.propTypes = {
  visible: PropTypes.bool,
  onClick: PropTypes.func
}

export default Back
