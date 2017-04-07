import React, { PropTypes, Component } from 'react'
import Surface from '../Surface'

class Draw extends Component {

  render() {
    const {
      drawing,
      saving,
      onSave,
      onCancel,
      onCommit,
    } = this.props
    return (
      <Surface
        drawing={drawing}
        saving={saving}
        onSave={onSave}
        onCancel={onCancel}
        onCommit={onCommit}
        interactive={true}
      />
    )
  }
}

Draw.propTypes = {
  drawing: React.PropTypes.object,
  onSave: React.PropTypes.func,
  onCommit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  interactive: React.PropTypes.bool,
  saving: PropTypes.bool,
}

export { Draw as default }
