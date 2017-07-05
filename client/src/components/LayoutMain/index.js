import React from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import { Link } from 'react-router-dom'
import spacing from 'config/spacing'
import colors from 'config/colors'
import Spinner from 'react-md-spinner'
import FlashMessages from 'components/FlashMessages'
import SectionNav from 'components/SectionNav'
import { sidebarStyles, mainStyles, containerStyles } from './styles'

const LayoutMain = ({
  back,
  title,
  actions,
  content,
  sidebar,
  activeSection,
}) => (
  <Box
    grow
    childFlex
    className={`ui-section-active-${activeSection}`}>
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
          children={
            <div>
              <Link style={{ textDecoration: 'none'}} to='/'>{title}</Link>
              <SectionNav sections={[{key: 'main', text: 'Lobby'}, {key: 'chat', text: 'Chat'}]} />
            </div>
          }
        /> }
      { actions &&
        <Box
          children={ actions }
        /> }
    </Box>
    <FlashMessages />

    {/* Main */}
    <Box
      grow
      shrink
      childDirection='row'
      childAlign='stretch'
      childFlex
      css={containerStyles}>
      <Box
        grow
        shrink
        css={mainStyles}
        className={ activeSection === 'main' ? 'ui-active' : '' }
        children={ content ? content : Spinner }/>
      { sidebar &&
        <Box
          childFlex
          childGrow
          className={ activeSection !== 'main' ? 'ui-active' : '' }
          css={sidebarStyles}
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
  activeSection: PropTypes.string,
}

export default LayoutMain
