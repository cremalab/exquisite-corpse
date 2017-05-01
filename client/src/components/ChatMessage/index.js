import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import spacing from 'config/spacing'
import colors from 'config/colors'
import Timestamp from 'components/Timestamp'

class ChatMessage extends PureComponent {
  render() {
    const { message, currentUser } = this.props

    let isSystemMsg = false
    if (message.id === 0 && message.name === 'system') isSystemMsg = true

    let backgroundColor = message.id === currentUser ? colors['tertiary-shade-5'] : colors['tertiary-tint-1']
    let textColor = message.id === currentUser ? colors['tertiary-tint-3'] : colors['tertiary-shade-5']

    if (isSystemMsg) {
      backgroundColor = 'transparent'
      textColor = colors['tertiary-shade-3']
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
            color: ${colors['secondary-tint-5']};
            white-space: nowrap;
            font-size: ${spacing[5]};
            `}>
            { message.name }
          </Box> }
          <Box
            grow={isSystemMsg ? 1 : 0}
            css={`
              color: ${colors['secondary-tint-5']};
              white-space: nowrap;
              font-size: ${spacing[4]};
              text-align: ${isSystemMsg ? 'center' : 'right'}
            `}>
            <Timestamp time={ message.timestamp } />
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
