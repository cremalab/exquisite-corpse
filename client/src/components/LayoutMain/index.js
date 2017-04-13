import React from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import { spacing, colors } from 'config/styles'

const LayoutMain = ({
  back,
  title,
  actions,
  content,
  sidebar,
}) => (
  <Box
    height="100%">

    {/* TitleBar */}
    <Box
      shrink='0'
      style={{
        backgroundColor: colors.primary,
        color: colors['white-shade-2'],
        '& a': { color: 'white' }
      }}
      padding={`${spacing[4]} ${spacing[5]}`}
      childAlign='center'
      childDirection='row'
      childSpacing={spacing[5]}>

      {
        // TitleBar - Back
        back &&
        <Box
          children={ back }
        />
      }

      {
        // TitleBar - Title
        title &&
        <Box
          grow='1'
          childJustify='center'
          childAlign='center'
          children={ title }
        />
      }

      {
        // TitleBar - Actions
        actions &&
        <Box
          children={ actions }
        />
      }
    </Box>

    {/* Main */}
    <Box
      grow='1'
      childDirection='row'
      childAlign='stretch'>

      {/* Main - Content */}
      <Box
        grow='1'
        style={{backgroundColor: colors['white-shade-1']}}
        children={ content }/>

      {
        // Main - Sidebar
        sidebar &&
        <Box
          style={{backgroundColor: colors['white-shade-2']}}
          width='350px'
          grow='1'
          shrink='0'
          childAlign='stretch'
          childGrow='1'
          children={ sidebar }
        />
      }
    </Box>
  </Box>
)

LayoutMain.propTypes = {
  back: PropTypes.node,
  title: PropTypes.node,
  actions: PropTypes.node,
  content: PropTypes.node,
  sidebar: PropTypes.node,
}

export default LayoutMain
