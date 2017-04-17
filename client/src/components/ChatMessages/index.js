import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Box from 'react-boxen'
import ChatMessage from 'components/ChatMessage'
import ChatInput from 'components/ChatInput'
import { isBefore } from 'date-fns'
import chatMessageSubmit from 'actions/chatMessageSubmit'
import { spacing } from 'config/styles'
import styled from 'styled-components'

function timestampDesc(a, b) {
  if (isBefore(a.timestamp, b.timestamp)) return -1
  return 1
}

const Scroll = styled.div`
  flex-grow: 1;
  overflow: scroll;
`

class ChatMessages extends Component {

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.scroll.scrollTop = this.scroll.scrollHeight
  }

  render() {
    const { messages, currentUser, chatMessageSubmit } = this.props

    return (
      <Box grow childFlex>
        <Scroll
          grow
          innerRef={(el) => { this.scroll = el }}>
          <Box
            padding={spacing[5]}
            childSpacing={spacing[4]}>
            <div>chat messages since you've arrived</div>
            { messages.sort(timestampDesc).map((message, i) => (
              <ChatMessage
                key={i}
                currentUser={currentUser.id}
                message={message} />
            )) }
          </Box>
        </Scroll>
        <Box
          shrink={0}
          padding={`0 ${spacing[4]} ${spacing[4]}`}>
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
