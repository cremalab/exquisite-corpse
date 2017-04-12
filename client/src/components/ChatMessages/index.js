import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Box from 'react-boxen'
import ChatMessage from 'components/ChatMessage'
import { isBefore } from 'date-fns'

class ChatMessages extends Component {
  render() {
    const { messages, currentUser } = this.props

    function timestampDesc(a, b) {
      if (isBefore(a.timestamp, b.timestamp)) return 1
      return -1
    }

    return (
      <Box childDirection='row'>
        <Box childSpacing='1px'>
          { messages.sort(timestampDesc).map((message, i) => (
            <ChatMessage
              key={i}
              currentUser={currentUser}
              message={message} />
          )) }
        </Box>
      </Box>
    )
  }
}

ChatMessages.propTypes = {
  dispatch: PropTypes.func,
  messages: PropTypes.array,
  currentUser: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
    currentUser: state.users.currentUser,
  }
}

export default connect(mapStateToProps)(ChatMessages)
