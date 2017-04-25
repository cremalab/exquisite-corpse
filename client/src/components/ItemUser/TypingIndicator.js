import React from 'react'
import colors from 'config/colors'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`

const Spinner = styled.div`
  margin: 0;
  width: 21px;
  text-align: center;
`

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${(props) => props.color ? props.color : colors['primary-shade-3']};

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: ${pulse} 1s infinite ease-in-out both;
  animation: ${pulse} 1s infinite ease-in-out both;

  -webkit-animation-delay: ${(props) => props.delay}s;
  animation-delay: ${(props) => props.delay}s;
`

const TypingIndicator = () =>
  <Spinner>
    <Dot color={colors['primary-tint-5']} delay={-0.32}/>
    <Dot color={colors['primary-tint-1']} delay={-0.16}/>
    <Dot />
  </Spinner>

export default TypingIndicator
