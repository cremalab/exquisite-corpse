import React from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import Icon from 'components/Icon'
import dismissMessage from 'actions/dismissMessage'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import spacing from 'config/spacing'
import colors from 'config/colors'

const FlashMessage = ({ message, type, id, dismissMessage }) => {
  let backgroundColor, color
  switch (type) {
    case 'error':
      backgroundColor = colors['danger']
      color = colors['white']
      break
    case 'notice':
      backgroundColor = colors['tertiary-shade-5']
      color = colors['white']
      break
    default:
      color = colors['black']
      backgroundColor = colors['tertiary-shade-2']
  }
  return (
    <Box
      padding={spacing[6]}
      css={`background-color: ${backgroundColor}; color: ${color}`}
      childSpacing={spacing[4]}
      childDirection='row'
      grow>
      <div data-grow='true'>{ message }</div>
      <div style={{cursor: 'pointer'}} data-shrink='true' onClick={() => dismissMessage(id)}>
        <Icon glyph='close' />
      </div>
    </Box>
  )
}

FlashMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  dismissMessage: PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dismissMessage,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(FlashMessage)
