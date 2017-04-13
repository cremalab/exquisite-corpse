import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Box from 'react-boxen'
import ChatMessage from 'components/ChatMessage'
import ChatInput from 'components/ChatInput'
import { isBefore } from 'date-fns'
import chatMessageSubmit from 'actions/chatMessageSubmit'

class ChatMessages extends Component {
  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const node = this.messagesEnd
    node.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { messages, currentUser, chatMessageSubmit } = this.props

    function timestampDesc(a, b) {
      if (isBefore(a.timestamp, b.timestamp)) return -1
      return 1
    }

    const css = {
      messages: {
        maxHeight: '300px',
        overflow: 'auto',
      },
      disclaimer: {
        color: '#ccc',
        textAlign: 'center',
      }
    }

    return (
      <Box>
        <div style={css.messages}>
          <Box childSpacing='1px'>
            <div style={css.disclaimer}>chat messages since you've arrived</div>
            { messages.sort(timestampDesc).map((message, i) => (
              <ChatMessage
                key={i}
                currentUser={currentUser.id}
                message={message} />
            )) }
            <div ref={(el) => { this.messagesEnd = el }}></div>
          </Box>
        </div>
        <ChatInput onSubmit={chatMessageSubmit} />
      </Box>
    )
  }
}

ChatMessages.propTypes = {
  dispatch: PropTypes.func,
  messages: PropTypes.array,
  currentUser: PropTypes.object,
  chatMessageSubmit: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
    currentUser: state.users.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ chatMessageSubmit }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages)
