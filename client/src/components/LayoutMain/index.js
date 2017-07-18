import React from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import breakpoints from 'config/breakpoints'
import spacing from 'config/spacing'
import colors from 'config/colors'
import Spinner from 'react-md-spinner'
import FlashMessages from 'components/FlashMessages'
import SectionNav from 'components/SectionNav'
import { Desktop, Mobile } from 'components/Responsive'

function getSectionsForRoute(location) {
  if (location.pathname === '/') {
    return [{key: 'main', text: 'Lobby'}, {key: 'chat', text: 'Chat'}]
  } else if (location.pathname.match(/drawing/g)) {
    return [
      {key: 'main', text: 'Draw'},
      {key: 'chat', text: 'Chat'},
    ]
  } else {
    return [{key: 'main', text: 'View'}, {key: 'chat', text: 'Chat'}]
  }
}

const LayoutMain = ({
  back,
  title,
  actions,
  content,
  sidebar,
  activeSection,
  location,
}) => {
  const Sidebar = (
    <Box
      childFlex
      childGrow
      style={{ minWidth: '260px' }}
      children={ sidebar } />
    )
  const Main = (
    <Box
      shrink
      grow
      children={ content ? content : Spinner }/>
  )

  return (
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
        <Box
          grow
          childAlign='center'
          children={
            <div>
              <MediaQuery query={`(min-width : ${breakpoints.lg}px)`}>
                { title && <Link style={{ textDecoration: 'none'}} to='/'>{title}</Link> }
              </MediaQuery>
              <MediaQuery query={`(max-width : ${breakpoints.md}px)`}>
                <SectionNav sections={getSectionsForRoute(location)} />
              </MediaQuery>
            </div>
          }
        />
        { actions &&
          <Box
            children={ actions }
          /> }
      </Box>
      <FlashMessages />

      {/* Main */}
      <div
        data-grow
        style={{ display: 'flex', flexGrow: 1 }}
        className='outer'>
        <Desktop grow style={{ display: 'flex', flexGrow: 1 }} className={'desktop'}>
          { Main }
          { sidebar && Sidebar }
        </Desktop>

        <Mobile grow style={{ display: 'flex', flexGrow: activeSection === 'main' ? 0 : 1 }} className={'mobile'}>
          { activeSection === 'main' && Main }
          { activeSection !== 'main' && Sidebar }
        </Mobile>

      </div>
    </Box>
  )
}

LayoutMain.propTypes = {
  back: PropTypes.node,
  title: PropTypes.node,
  actions: PropTypes.node,
  content: PropTypes.node,
  sidebar: PropTypes.node,
  activeSection: PropTypes.string,
  location: PropTypes.object,
}

export default LayoutMain
