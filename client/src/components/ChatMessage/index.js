import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'
import { spacing, colors } from 'config/styles'

class ChatMessage extends Component {
  render() {
    const { message, currentUser } = this.props
    return (
      <Box childSpacing={spacing[3]}>
        <Box childAlign="center" childDirection="row">
          <Box grow css={`
            color: ${colors['gray-tint-1']};
            white-space: nowrap;
            font-size: ${spacing[5]};
            `}>
            { message.name }
          </Box>
          <Box css={`
            color: ${colors['gray-tint-1']};
            white-space: nowrap;
            font-size: ${spacing[4]};
            `}>
            { distanceInWordsToNow(message.timestamp) + ' ago'}
          </Box>
        </Box>
        <Box
          childDirection='row'
          css={`
            padding: ${spacing[4]} ${spacing[5]};
            border-radius: ${spacing[3]};
            background: ${message.id === currentUser ? colors.blue : colors['blue-tint-2']};
            color: ${message.id === currentUser ? colors['blue-tint-2'] : colors.blue};
            font-size: ${spacing[5]};
          `}>
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
