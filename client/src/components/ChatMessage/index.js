import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'
import { spacing, colors } from 'config/styles'

class ChatMessage extends Component {
  render() {
    const { message, currentUser } = this.props

    let isSystemMsg = false
    if (message.id === 0 && message.name === 'system') isSystemMsg = true

    let backgroundColor = message.id === currentUser ? colors.blue : colors['blue-tint-2']
    let textColor = message.id === currentUser ? colors['blue-tint-2'] : colors.blue

    if (isSystemMsg) {
      backgroundColor = 'transparent'
      textColor = colors['gray-tint-1']
    }

    const messageStyle = `
      padding: ${spacing[4]} ${spacing[5]};
      border-radius: ${spacing[3]};
      background: ${backgroundColor};
      color: ${textColor};
      font-size: ${spacing[5]};
      text-align: ${isSystemMsg ? 'center' : 'left'};
      font-style: ${isSystemMsg ? 'italic' : 'normal'};
    `

    return (
      <Box childSpacing={spacing[3]} grow={isSystemMsg ? 1 : 0}>
        <Box childAlign="center" childDirection="row">
          { !isSystemMsg && <Box grow css={`
            color: ${colors['gray-tint-1']};
            white-space: nowrap;
            font-size: ${spacing[5]};
            `}>
            { message.name }
          </Box> }
          <Box
            grow={isSystemMsg ? 1 : 0}
            css={`
              color: ${colors['gray-tint-1']};
              white-space: nowrap;
              font-size: ${spacing[4]};
              text-align: ${isSystemMsg ? 'center' : 'right'}
            `}>
            { distanceInWordsToNow(message.timestamp) + ' ago'}
          </Box>
        </Box>
        <Box
          childDirection='column'
          grow={isSystemMsg ? 1 : 0}
          css={messageStyle}>
          { message.content }
        </Box>
      </Box>
    )
  }
}

ChatMessage.propTypes = {
  message: PropTypes.object,
  currentUser: PropTypes.string,
}

export default ChatMessage
