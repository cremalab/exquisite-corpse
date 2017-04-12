import React, { Component, PropTypes } from 'react'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'

class ChatMessage extends Component {
  render() {
    const { message, currentUser } = this.props

    const css = {
      message: {
        borderRadius: '6px',
        backgroundColor: message.id === currentUser.id ? '#17c0ff' : '#f0fbff',
        color: message.id === currentUser.id ? '#fff' : '#000',
      },
      container: {
        marginBottom: '1em'
      },
      meta: {
        opacity: 0.5,
        fontFamily: 'sans-serif',
        fontSize: '60%',
      }
    }

    return (
      <Box childSpacing='5px' style={css.container}>
        <Box childAlign="center" childDirection="row" childJustify="space-between">
          <Box grow='1'>{ message.name }</Box>
          <Box style={css.meta}>
            <div>{ distanceInWordsToNow(message.timestamp) } ago</div>
          </Box>
        </Box>
        <Box
          childDirection='row'
          padding='1em'
          style={css.message}>
          { message.content }
        </Box>
      </Box>
    )
  }
}

ChatMessage.propTypes = {
  message: PropTypes.object
}

export default ChatMessage
