import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors, spacing } from 'config/styles'
import Box from 'react-boxen'

const StyledButton = styled.button`
  padding: ${spacing[4]} ${spacing[6]};
  border-radius: ${spacing[8]};
  border: none;
  background: ${colors.primary};
  color: white;
`

const Button = props =>
  <StyledButton>
    <Box
      childDirection='row'
      childAlign='center'
      childSpacing={spacing[4]}>
      { props.prefix && <div>{props.prefix}</div> }
      <div>{props.children}</div>
      { props.suffix && <div>{props.prefix}</div> }
    </Box>
  </StyledButton>

Button.propTypes = {
  prefix: PropTypes.node,
  children: PropTypes.node,
  suffix: PropTypes.node
}

export default Button
