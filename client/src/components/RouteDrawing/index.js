import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import Box from 'react-boxen'

class RouteDrawing extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(drawingClear())
  }

  componentDidMount() {
    const { dispatch, drawingId } = this.props
    dispatch(drawingLoad(drawingId))
  }

  componentWillUnmount() {
    const { dispatch, drawing: { result: { corpse }} } = this.props
    dispatch(drawingClear())
    dispatch(unsubscribe(`/corpses/${corpse}`))
  }

  componentWillReceiveProps(props) {
    const corpseId = props.drawing.result.corpse
    const { dispatch, subscribed } = this.props
    if (!corpseId || subscribed) return
    dispatch(subscribe(`/corpses/${props.drawing.result.corpse}`))
  }

  render() {
    const { drawing: { result, loading, saving } } = this.props
    let alert = null
    if (result.status === 'expired') {
      alert = <h4>This drawing wasn't completed in time and is expired.</h4>
    } else if (!result.corpse) {
      alert = <h4>Oh no! The creator of this corpse decided to delete it :(</h4>
    }

    if ( loading ) return <Spinner />
    return (
      <Box>
        { alert }
        <Surface
          drawing={result}
          saving={saving}
          onSave={this.onSave.bind(this)}
          onCancel={this.onCancel.bind(this)}
          onCommit={this.onCommit.bind(this)}
          interactive={true}
        />
      </Box>
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
  subscribed: PropTypes.bool,
}

function mapStateToProps(state, props) {
  return {
    drawingId: props.match.params.drawingId,
    drawing: state.drawing,
    subscribed: state.drawing.corpseSubscribed,
  }
}

export default connect(mapStateToProps)(RouteDrawing)
