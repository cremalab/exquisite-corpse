import React from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import { Link } from 'react-router-dom'
import { spacing, colors } from 'config/styles'
import Spinner from 'react-md-spinner'

const LayoutMain = ({
  back,
  title,
  actions,
  content,
  sidebar,
}) => (
  <Box
    grow
    childFlex>
    <Box
      childAlign='center'
      childDirection='row'
      childSpacing={spacing[5]}
      shrink={0}
      css={`
        background-color: ${colors.primary};
        color: ${colors['white-shade-2']};
        padding: ${spacing[4]} ${spacing[5]};
        & a { color: white; }
      `}>
      { back &&
        <div
          children={ back }
        /> }
      { title &&
        <Box
          grow
          childAlign='center'
          children={ <Link style={{ textDecoration: 'none'}} to='/'>{title}</Link> }
        /> }
      { actions &&
        <Box
          children={ actions }
        /> }
    </Box>

    {/* Main */}
    <Box
      grow
      childDirection='row'
      childAlign='stretch'
      childFlex>
      <Box
        grow
        background={colors['white-shade-1']}
        css={`overflow: scroll`}
        children={ content ? content : Spinner }/>
      { sidebar &&
        <Box
          background={colors['white-shade-2']}
          width='350px'
          childFlex
          children={ sidebar } /> }
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
