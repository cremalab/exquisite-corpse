import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Box from 'react-boxen'
import ChatMessage from 'components/ChatMessage'
import ChatInput from 'components/ChatInput'
import { isBefore } from 'date-fns'
import chatMessageSubmit from 'actions/chatMessageSubmit'
import Scroll from 'components/Scroll'
import { spacing, colors } from 'config/styles'

function timestampDesc(a, b) {
  if (isBefore(a.timestamp, b.timestamp)) return -1
  return 1
}

const css = {
  disclaimer: {
    color: '#ccc',
    textAlign: 'center',
  }
}

class ChatMessages extends Component {

  render() {
    const { messages, currentUser, chatMessageSubmit } = this.props

    return (
      <Box grow='1'>
        <Box
          childGrow='1'
          childSpacing='1px'
          grow='1'>
          <Scroll align='bottom'>
            <div style={css.disclaimer}>chat messages since you've arrived</div>
            <Box padding={spacing[4]} childSpacing={spacing[3]}>
              { messages.sort(timestampDesc).map((message, i) => (
                <ChatMessage
                  key={i}
                  currentUser={currentUser.id}
                  message={message} />
              )) }
            </Box>
          </Scroll>
        </Box>
        <Box
          style={{ backgroundColor: colors['white-shade-3'] }}
          padding={spacing[4]}>
          <ChatInput onSubmit={chatMessageSubmit} />
        </Box>
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
