import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Box from 'react-boxen'
import MediaQuery from 'react-responsive'

import breakpoints from 'config/breakpoints'
import ItemCorpseSections from 'components/ItemCorpseSections'
import ChatMessages from 'components/ChatMessages'
import ListUsers from 'components/ListUsers'
import colors from 'config/colors'

const RouteDrawingSidebar = ({ corpse }) =>
  <Box grow childFlex childDirection='column'>
    <MediaQuery query={`(max-width : ${breakpoints.md})`}>
      <ItemCorpseSections corpse={corpse} grow basis={100} />
    </MediaQuery>
    <MediaQuery query={`(min-width : ${breakpoints.md})`}>
      <ItemCorpseSections corpse={corpse} showCarrot grow basis={300} />
    </MediaQuery>
    <Box
      childFlex
      grow
      css={`border-top: 1px solid ${colors['white-shade-2']}`}>
      <ListUsers />
      <ChatMessages grow />
    </Box>
  </Box>

RouteDrawingSidebar.propTypes = {
  corpse: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    corpse: state.corpse,
  }
}

export default connect(mapStateToProps)(RouteDrawingSidebar)
