import React from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import Icon from 'components/Icon'
import TypingIndicator from './TypingIndicator'
import DrawingIndicator from './DrawingIndicator'
import spacing from 'config/spacing'
import colors from 'config/colors'

function renderStatusMarkup(status) {
  switch (status) {
    case 'idle':
      return <Icon glyph='user' />
    case 'drawing':
      return <DrawingIndicator />
    case 'typing':
      return <TypingIndicator />
    default:
      return 'user'
  }
}

const ItemUser = ({ status, name, provider }) =>
  <Box {...boxProps} childSpacing={spacing[6]} >
    <Box
      childSpacing={spacing[4]}
      childDirection='row'>
      {renderStatusMarkup(status)}
    </Box>
    <div>{ name }</div>
    <div>{ provider }</div>
  </Box>

const boxProps = {
  childDirection: 'row',
  childSpacing: spacing[4],
  css: `
    padding: ${spacing[4]};
    background: ${colors['white']};
  `
}

ItemUser.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
}

export default ItemUser
