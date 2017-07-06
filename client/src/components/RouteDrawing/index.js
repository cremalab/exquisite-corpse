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
import statusChange from 'actions/statusChange'
import subscribe from 'actions/subscribe'
import unsubscribe from 'actions/unsubscribe'
import Box from 'react-boxen'
import colors from 'config/colors'
import spacing from 'config/spacing'
import { addMilliseconds } from 'date-fns'
import { MEMBER_WINDOW, GUEST_WINDOW } from '../../../../config/constants'
import ItemCorpseSections from 'components/ItemCorpseSections'

class RouteDrawing extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(drawingClear())
  }

  componentDidMount() {
    const { dispatch, drawingId } = this.props
    dispatch(drawingLoad(drawingId, true))
    dispatch(statusChange('drawing'))
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
    const sectionName = corpse.sections
      .filter(x => x._id === result.section)
      .map(s => <em key={s._id} style={{color: colors['primary']}}>{s.description}</em>)[0]
    const instructions = (
      <div style={{textAlign: 'center'}}>
        <p style={{ fontWeight: 'bold' }}>You are drawing {sectionName}</p>
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
    // {corpse && <ItemCorpseSections corpse={corpse} grow basis={100} /> }
    if ( loading ) return <Spinner />
    return (
      <Box>
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
