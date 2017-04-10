import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Surface from '../Surface'
import Spinner from 'react-md-spinner'
import {saveDrawing, commitDrawing, cancelDrawing, clearDrawing } from 'actions/drawings'
import drawingLoad from 'actions/drawingLoad'

class RouteDrawing extends Component {
  componentWillMount() {
    const { dispatch, drawingId } = this.props
    dispatch(clearDrawing())
    dispatch(drawingLoad(drawingId))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearDrawing())
  }

  render() {
    const { drawing: { result, loading, saving } } = this.props
    if ( loading ) return <Spinner />
    return (
      <Surface
        drawing={result}
        saving={saving}
        onSave={this.onSave.bind(this)}
        onCancel={this.onCancel.bind(this)}
        onCommit={this.onCommit.bind(this)}
        interactive={true}
      />
    )
  }

  onSave(canvas) {
    const { dispatch, drawing: { result } } = this.props
    dispatch(saveDrawing(result._id, canvas))
  }

  onCommit() {
    const { dispatch, drawing: { result } } = this.props
    dispatch(commitDrawing(result._id))
  }

  onCancel() {
    const { dispatch, drawing: { result } } = this.props
    dispatch(cancelDrawing(result._id))
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
