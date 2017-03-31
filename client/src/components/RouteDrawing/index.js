import React from 'react'
import { connect } from 'react-redux'
import Draw from '../Draw'
import Spinner from 'react-md-spinner'
import {loadDrawing} from 'actions/drawings'

class RouteDrawing extends React.Component {
  componentWillMount() {
    const { dispatch, drawingId } = this.props
    dispatch(loadDrawing(drawingId))
  }

  render() {
    const { drawing, corpse: { loading } } = this.props

    if ( loading ) return <Spinner />

    return <Draw drawing={drawing} />
  }
}

function mapStateToProps(state, props) {
  return {
    corpse: state.corpse,
    drawingId: props.match.params.drawingId,
    drawing: state.drawing.result
  }
}

RouteDrawing = connect(mapStateToProps)(RouteDrawing)

export default RouteDrawing;
