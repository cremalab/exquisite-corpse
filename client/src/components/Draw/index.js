import paperjs from 'paper'
import React, { Component } from 'react'
import canvasStyle from './canvasStyle'
import Button from 'react-bootstrap/lib/Button';
import Surface from '../Surface'

class Draw extends Component {

  constructor() {
    super()
    this.paper = null
  }

  render() {
    const {drawing, saving, width, height} = this.props;
    const style = Object.assign(canvasStyle, { width, height})
    return <Surface
      drawing={drawing}
      saving={saving}
      onSave={this.props.onSave}
      onCommit={this.props.onCommit}
      interactive={true}
    ></Surface>
  }
}

Draw.propTypes = {
  drawing: React.PropTypes.object,
  onSave: React.PropTypes.func,
  onCommit: React.PropTypes.func,
  interactive: React.PropTypes.bool,
}

export { Draw as default }
