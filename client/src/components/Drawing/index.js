import React from 'react'
import { connect } from 'react-redux'
import Draw from '../Draw'
import { loadDrawing } from 'actions/drawings'

class Drawing extends React.Component {
  componentWillMount() {
    const { dispatch, drawingId } = this.props
    dispatch(loadDrawing(drawingId))
  }
  render() {
    return <div>
      <Draw />
    </div>
  }
}

function mapStateToProps(state, props) {
  return {
    drawingId: props.match.params.drawingId
  }
}

Drawing = connect(mapStateToProps)(Drawing)

export default Drawing;
