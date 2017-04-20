import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Box from 'react-boxen'
import ChatMessage from 'components/ChatMessage'
import ChatInput from 'components/ChatInput'
import { isBefore } from 'date-fns'
import chatMessageSubmit from 'actions/chatMessageSubmit'
import statusChange from 'actions/statusChange'
import { spacing, colors } from 'config/styles'
import styled from 'styled-components'

function timestampDesc(a, b) {
  if (isBefore(a.timestamp, b.timestamp)) return -1
  return 1
}

const Scroll = styled.div`
  flex-grow: 1;
  overflow: scroll;
`

const Header = styled.div`
  text-align: center;
  color: ${colors.gray};
  font-size: ${spacing[5]};
`

function debounce(func, wait, immediate) {
  var timeout
  return function() {
    var context = this, args = arguments
    var later = function() {
      timeout = null
      func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

class ChatMessages extends Component {
  constructor(props) {
    super(props)
    this.handleChange = debounce(this.handleChange.bind(this), 800, true)
  }
  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.scroll.scrollTop = this.scroll.scrollHeight
  }

  handleChange(data) {
    const { statusChange } = this.props
    if (data.message && data.message !== '') {
      statusChange('typing')
    } else {
      statusChange('idle')
    }
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
            <Header>since you've arrived...</Header>
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
          <ChatInput onSubmit={chatMessageSubmit} onChange={this.handleChange} />
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
  statusChange: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
    currentUser: state.users.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ chatMessageSubmit, statusChange }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages)
