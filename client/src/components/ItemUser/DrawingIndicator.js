import React from 'react'
import Icon from 'components/Icon'
import styled, { keyframes } from 'styled-components'

const wiggle = keyframes`
  0%, 100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  } 50% {
    -webkit-transform: rotate(-8deg);
    transform: rotate(-8deg);
  }
`

const Wiggler = styled.div`
  -webkit-animation: ${wiggle} 1.2s infinite ease-in-out both;
  animation: ${wiggle} 1.2s infinite ease-in-out both;
`

const DrawingIndicator = () =>
  <Wiggler><Icon glyph='draw' /></Wiggler>

export default DrawingIndicator
