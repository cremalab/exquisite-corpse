import React from 'react'
import { connect } from 'react-redux'
import Draw from '../Draw'
import Spinner from 'react-md-spinner'
import {loadDrawing, saveDrawing, commitDrawing, cancelDrawing } from 'actions/drawings'

class RouteDrawing extends React.Component {
  componentWillMount() {
    const { dispatch, drawingId } = this.props
    dispatch(loadDrawing(drawingId))
  }

  render() {
    const { drawing: { result, loading, saving } } = this.props
    if ( loading ) return <Spinner />
    return <Draw
      drawing={result}
      saving={saving}
      onSave={this.onSave.bind(this)}
      onCancel={this.onCancel.bind(this)}
      onCommit={this.onCommit.bind(this)}
    />
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

function mapStateToProps(state, props) {
  return {
    drawingId: props.match.params.drawingId,
    drawing: state.drawing,
  }
}

export default connect(mapStateToProps)(RouteDrawing)
