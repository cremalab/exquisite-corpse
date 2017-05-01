import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { addMilliseconds, distanceInWordsToNow } from 'date-fns'
import styled from 'styled-components'

class LiveTimestamp extends Component {
  constructor() {
    super()
    this.state = {
      seconds: 0,
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    this.setState({ seconds: this.state.seconds + 1 })
  }

  render() {
    const relativeOptions = {
      includeSeconds: true,
      addSuffix: true,
    }
    const { target, prefix } = this.props
    return <span>{prefix && prefix} {distanceInWordsToNow(target, relativeOptions)}</span>
  }
}

LiveTimestamp.propTypes = {
  target: PropTypes.object,
  prefix: PropTypes.string,
}

export default LiveTimestamp
