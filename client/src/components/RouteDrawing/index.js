import React from 'react'
import { connect } from 'react-redux'
import Draw from '../Draw'
import Spinner from 'react-md-spinner'
import {loadDrawing, saveDrawing} from 'actions/drawings'

class RouteDrawing extends React.Component {
  componentWillMount() {
    const { dispatch, drawingId } = this.props
    dispatch(loadDrawing(drawingId))
  }

  render() {
    const { drawing: { result, loading } } = this.props
    if ( loading ) return <Spinner />
    return <Draw drawing={result} onSave={this.onSave.bind(this)} />
  }

  onSave(canvas) {
    const { dispatch, drawing: { result } } = this.props
    dispatch(saveDrawing(result._id, canvas))
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
