import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTimeAgo } from 'reducers/time'

class Timestamp extends PureComponent {
  render() {
    const { time } = this.props
    return time && <span>{ time }</span>
  }
}

Timestamp.defaultProps = {
  time: null
}

Timestamp.propTypes = {
  time: PropTypes.string
}

const mapStateToProps = (state, props) => ({
  time: getTimeAgo(state)(props.time)
})

export default connect(mapStateToProps)(Timestamp)
