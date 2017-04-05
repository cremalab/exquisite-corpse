import React from 'react'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class RangeInput extends React.Component {
  render() {
    const { input: { value, onChange }, meta, ...rest } = this.props
    return (
      <Range {...rest} value={value} onChange={vals => onChange(vals)} />
    )
  }
}

export default RangeInput;
