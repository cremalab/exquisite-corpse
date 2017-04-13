import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Surface from '../Surface'
import Spinner from 'react-md-spinner'
import drawingLoad from 'actions/drawingLoad'
import drawingSave from 'actions/drawingSave'
import drawingCancel from 'actions/drawingCancel'
import drawingCommit from 'actions/drawingCommit'
import drawingClear from 'actions/drawingClear'
import subscribe from 'actions/subscribe'
import unsubscribe from 'actions/unsubscribe'

class RouteDrawing extends Component {
  componentWillMount() {
    const { dispatch, drawingId } = this.props
    dispatch(drawingClear())
    dispatch(drawingLoad(drawingId))
  }

  componentWillUnmount() {
    const { dispatch, drawing: { result: { corpse }} } = this.props
    dispatch(drawingClear())
    dispatch(unsubscribe(`/corpses/${corpse}`))
  }

  componentWillReceiveProps(props) {
    const corpseId = props.drawing.result.corpse
    const { dispatch } = this.props
    if (!corpseId) return
    dispatch(subscribe(`/corpses/${props.drawing.result.corpse}`))
  }

  render() {
    const { drawing: { result, loading, saving } } = this.props
    if ( loading ) return <Spinner />
    return (
      <div>
        { !result.corpse && <h4>Oh no! The creator of this corpse decided to delete it :(</h4> }
        <Surface
          drawing={result}
          saving={saving}
          onSave={this.onSave.bind(this)}
          onCancel={this.onCancel.bind(this)}
          onCommit={this.onCommit.bind(this)}
          interactive={true}
        />
      </div>
    )
  }

  onSave(canvas) {
    const { dispatch, drawing: { result } } = this.props
    dispatch(drawingSave(result._id, canvas))
  }

  onCommit() {
    const { dispatch, drawing: { result } } = this.props
    dispatch(drawingCommit(result._id))
  }

  onCancel() {
    const { dispatch, drawing: { result } } = this.props
    dispatch(drawingCancel(result._id))
  }
}

RouteDrawing.propTypes = {
  dispatch: PropTypes.func,
  drawing: PropTypes.object,
  drawingId: PropTypes.string,
}

function mapStateToProps(state, props) {
  return {
    drawingId: props.match.params.drawingId,
    drawing: state.drawing,
  }
}

export default connect(mapStateToProps)(RouteDrawing)
