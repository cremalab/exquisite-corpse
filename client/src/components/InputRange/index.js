import React from 'react'
import PropTypes from 'prop-types'
import { Range } from 'rc-slider'
import './styles.css'

class RangeInput extends React.Component {
  render() {
    const { input: { value, onChange }, ...rest } = this.props
    return (
      <Range {...rest} value={value} onChange={vals => onChange(vals)} />
    )
  }
}

RangeInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  step: PropTypes.number,
  pushable: PropTypes.bool,
}

export default RangeInput
