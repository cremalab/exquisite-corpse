import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DrawingCanvas from '../DrawingCanvas'
import LiveTimestamp from '../LiveTimestamp'
import DrawingSectionName from '../DrawingSectionName'
import ModalDrawingTutorial from '../ModalDrawingTutorial'
import Spinner from 'react-md-spinner'
import drawingLoad from 'actions/drawingLoad'
import drawingSave from 'actions/drawingSave'
import drawingCancel from 'actions/drawingCancel'
import drawingCommit from 'actions/drawingCommit'
import drawingClear from 'actions/drawingClear'
import statusChange from 'actions/statusChange'
import subscribe from 'actions/subscribe'
import unsubscribe from 'actions/unsubscribe'
import uiModalOpen from 'actions/uiModalOpen'
import Box from 'react-boxen'
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
    dispatch(statusChange('drawing'))
    dispatch(uiModalOpen('tutorial'))
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
    const { drawing: { result, loading, saving }, corpse, ui } = this.props
    let timeWindow = MEMBER_WINDOW
    if (result.drawer && result.drawer.provider === 'guest') {
      timeWindow = GUEST_WINDOW
    }
    const expiration = addMilliseconds(new Date(result.updatedAt), timeWindow)
    const instructions = (
      <div style={{textAlign: 'center'}}>
        { result.section && <DrawingSectionName corpse={corpse} section={result.section} prefix='You are drawing ' /> }
        <p style={{ fontSize: '12px' }}>
          <LiveTimestamp target={expiration} prefix='expires'/>, based on your last edit
        </p>
      </div>
    )

    let alert = null
    if (result.status === 'expired') {
      alert = <h4>This drawing wasn't completed in time and is expired.</h4>
    } else if (!result.corpse) {
      alert = <h4>Oh no! The creator of this corpse decided to delete it :(</h4>
    }

    if ( loading ) return <Spinner />
    return (
      <Box>
        { result.section &&
          <ModalDrawingTutorial
            isOpen={ui.activeModal === 'tutorial' && (result && result.status !== 'expired')}
            corpse={corpse}
            section={result.section}
            timeWindow={timeWindow} />
        }
        <Box align='center' padding={spacing[4]}>
          { alert ? alert : instructions }
        </Box>
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
  ui: PropTypes.object,
}

function mapStateToProps(state, props) {
  return {
    drawingId: props.match.params.drawingId,
    drawing: state.drawing,
    subscribed: state.drawing.corpseSubscribed,
    corpse: state.corpse,
    ui: state.ui,
  }
}

export default connect(mapStateToProps)(RouteDrawing)
