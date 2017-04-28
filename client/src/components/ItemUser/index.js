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
    case 'viewing':
      return <Icon glyph='eye' />
    case 'drawing':
      return <DrawingIndicator />
    case 'typing':
      return <TypingIndicator />
    default:
      return 'user'
  }
}

function renderProviderIcon(provider) {
  switch (provider) {
    case 'slack':
      return <Icon glyph='slack' />
    case 'github':
      return <Icon glyph='github' />
    default:
      return null

  }
}

const ItemUser = ({ status, name, provider }) => {
  return <Box {...boxProps}>
    <Box
      childSpacing={spacing[4]}
      childDirection='row'>
      {renderStatusMarkup(status)}
    </Box>
    <div data-grow={true} style={{ color: colors['secondary-shade-3'] }}>{ name }</div>
    <div data-shrink='true' style={{opacity: 0.5}}>{ renderProviderIcon(provider) }</div>
  </Box>
}

const boxProps = {
  childDirection: 'row',
  childSpacing: spacing[4],
  css: `
    padding: ${spacing[4]};
    background: ${colors['tertiary-tint-3']};
  `
}

ItemUser.propTypes = {
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  provider: PropTypes.string,
}

ItemUser.defaultProps = {
  name: '???'
}

export default ItemUser
