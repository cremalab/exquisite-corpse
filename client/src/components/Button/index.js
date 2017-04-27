import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import spacing from 'config/spacing'
import Box from 'react-boxen'
import { background, color } from './utils'
import colors from 'config/colors'

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  margin: 0;
  line-height: 1;
  padding: ${spacing[4]} ${spacing[6]};
  border-radius: ${spacing[8]};
  border: none;
  background: ${background};
  font-size: ${props => spacing[props.size]};
  color: ${color};
  cursor: pointer;
  transition: all 0.125s ease-in-out;
  min-width: ${props => props.wide ? '10em' : 0 };
  ${props => `
    &:hover {
      background: ${colors[`${props.skin}-tint-1`]};
    }
    &:active {
      background: ${colors[`${props.skin}-shade-1`]};
    }
    &[disabled] {
      opacity: 0.5;
      cursor: default;
      &:hover {
        background: ${colors[`${props.skin}`]}
      }
    }
  `}
`

const Button = props => {
  const { children, prefix, suffix, ...rest } = props
  return <StyledButton {...rest}>
    <Box
      childDirection='row'
      childAlign='center'
      childJustify='center'
      childSpacing={spacing[4]}>
      { prefix }
      { children }
      { suffix }
    </Box>
  </StyledButton>
}

Button.defaultProps = {
  size: 5,
  skin: 'primary'
}

Button.propTypes = {
  prefix: PropTypes.node,
  children: PropTypes.node,
  suffix: PropTypes.node
}

export default Button
