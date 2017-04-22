import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ItemCorpseSections from 'components/ItemCorpseSections'

const RouteDrawingSidebar = ({ corpse }) =>
  <ItemCorpseSections corpse={corpse} showCarrot />

RouteDrawingSidebar.propTypes = {
  corpse: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    corpse: state.corpse,
  }
}

export default connect(mapStateToProps)(RouteDrawingSidebar)
