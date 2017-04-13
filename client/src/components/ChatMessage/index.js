import React, { Component, PropTypes } from 'react'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'
import { spacing, colors } from 'config/styles'

class ChatMessage extends Component {
  render() {
    const { message, currentUser } = this.props

    const css = {
      message: {
        borderRadius: '6px',
        backgroundColor: message.id === currentUser ? colors.primary : colors.secondary,
        color: message.id === currentUser.id ? 'white' : '#000',
      },
      meta: {
        opacity: 0.5,
        fontFamily: 'sans-serif',
        fontSize: '60%',
      }
    }

    return (
      <Box childSpacing='5px'>
        <Box childAlign="center" childDirection="row">
          <Box grow='1'>{ message.name }</Box>
          <Box style={css.meta}>
            <div>{ distanceInWordsToNow(message.timestamp) } ago</div>
          </Box>
        </Box>
        <Box
          childDirection='row'
          padding={`${spacing[3]} ${spacing[4]}`}
          style={css.message}>
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
