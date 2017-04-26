import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DrawingCanvas from '../DrawingCanvas'
import LiveTimestamp from '../LiveTimestamp'
import Spinner from 'react-md-spinner'
import drawingLoad from 'actions/drawingLoad'
import drawingSave from 'actions/drawingSave'
import drawingCancel from 'actions/drawingCancel'
import drawingCommit from 'actions/drawingCommit'
import drawingClear from 'actions/drawingClear'
import subscribe from 'actions/subscribe'
import unsubscribe from 'actions/unsubscribe'
import Box from 'react-boxen'
import colors from 'config/colors'
import spacing from 'config/spacing'
import { addMilliseconds } from 'date-fns'
import { MEMBER_WINDOW, GUEST_WINDOW } from '../../../../config/constants'

class RouteDrawing extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(drawingClear())
  }

  componentDidMount() {
    const { dispatch, drawingId } = this.props
    dispatch(drawingLoad(drawingId, true))
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
    const { drawing: { result, loading, saving }, corpse } = this.props
    let timeWindow = MEMBER_WINDOW
    if (result.drawer && result.drawer.provider === 'guest') {
      timeWindow = GUEST_WINDOW
    }
    const expiration = addMilliseconds(new Date(result.updatedAt), timeWindow)
    let alert = null
    if (result.status === 'expired') {
      alert = <h4>This drawing wasn't completed in time and is expired.</h4>
    } else if (!result.corpse) {
      alert = <h4>Oh no! The creator of this corpse decided to delete it :(</h4>
    }

    if ( loading ) return <Spinner />
    return (
      <Box>
        { alert ? alert : <Box grow padding={spacing[5]} style={{ textAlign: 'center', background: colors['white-shade-1'] }}>
          <span><LiveTimestamp target={expiration} prefix='Your drawing expires'/>
          , based on your last edit.
          </span>
          </Box>
        }

        <DrawingCanvas
          drawing={result}
          saving={saving}
          onSave={this.onSave.bind(this)}
          onCancel={this.onCancel.bind(this)}
          onCommit={this.onCommit.bind(this)}
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
  corpse: PropTypes.object,
}

function mapStateToProps(state, props) {
  return {
    drawingId: props.match.params.drawingId,
    drawing: state.drawing,
    subscribed: state.drawing.corpseSubscribed,
    corpse: state.corpse,
  }
}

export default connect(mapStateToProps)(RouteDrawing)
