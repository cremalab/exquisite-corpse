import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import timeStart from 'actions/timeStart'

class Initializer extends Component {
  componentDidMount() {
    const { timeStart } = this.props

    timeStart()
  }

  render() {
    return Children.only(this.props.children)
  }
}

Initializer.propTypes = {
  children: PropTypes.any,
  timeStart: PropTypes.func
}

export default connect(
  null,
  {
    timeStart
  }
)(Initializer)
