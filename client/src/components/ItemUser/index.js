import React from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import spacing from 'config/spacing'
import colors from 'config/colors'

const ItemUser = ({ status, name, provider }) =>
  <Box {...boxProps} >
    <div>{ status }</div>
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
