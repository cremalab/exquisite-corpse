import React from 'react'
import { connect } from 'react-redux'
import Draw from '../Draw'
import Spinner from 'react-md-spinner'
import {loadDrawing, saveDrawing, commitDrawing} from 'actions/drawings'

class RouteDrawing extends React.Component {
  componentWillMount() {
    const { dispatch, drawingId } = this.props
    dispatch(loadDrawing(drawingId))
  }

  render() {
    const { drawing: { result, loading, saving } } = this.props
    console.log(result);
    if ( loading ) return <Spinner />
    return <Draw
      drawing={result}
      saving={saving}
      onSave={this.onSave.bind(this)}
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
}

function mapStateToProps(state, props) {
  return {
    drawingId: props.match.params.drawingId,
    drawing: state.drawing,
  }
}

RouteDrawing = connect(mapStateToProps)(RouteDrawing)

export default RouteDrawing;
