import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'react-md-spinner'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import { format } from 'date-fns'
import corpseClear from 'actions/corpseClear'
import corpseLoad from 'actions/corpseLoad'
import corpseDestroy from 'actions/corpseDestroy'
import drawingCreate from 'actions/drawingCreate'
import subscribe from 'actions/subscribe'
import unsubscribe from 'actions/unsubscribe'
import Surface from '../Surface'
import { colors, spacing } from 'config/styles'

const css = {
  finalFrame: {
    border: `6px solid ${colors.secondary}`,
    backgroundColor: '#fff',
    margin: `${spacing[6]} ${spacing[6]}`,
    padding: spacing[6],
  },
}

class Corpse extends Component {
  componentWillMount() {
    const { dispatch, corpseId, corpse } = this.props
    dispatch(corpseClear())
    if (corpse.removed) { return }
    dispatch(corpseLoad(corpseId))
    dispatch(subscribe(`/corpses/${corpseId}`))
  }

  componentWillUnmount() {
    const { dispatch, corpseId } = this.props
    dispatch(unsubscribe(`/corpses/${corpseId}`))
    dispatch(corpseClear())
  }

  shouldComponentUpdate() {
    // Done to prevent re-mount on socket event
    const { dispatch, corpse: { removed } } = this.props
    if (removed) {
      dispatch(push('/'))
      return false
    }
    return true
  }

  render() {
    const { corpse: {
      loading, sections, status, size = {}, creator, createdAt
    }, currentUser } = this.props
    const creatorId = this.props.corpse.creator.id
    const isComplete = status === 'complete'

    if ( loading ) return <Spinner />
    const finalDrawing = isComplete ? (
      <div
        style={css.finalFrame}
        >
        <Surface
          drawing={this.props.corpse}
          height={size.height}
          width={size.width}
        />
      </div>
    ) : null
    return (
      <div>
        <Box>
          { creatorId === currentUser.id && <button onClick={() => this.handleDestroy()}>Delete corpse</button> }
          <Box padding={spacing[6]} childDirection='row' childAlign='center'>
            <Box
              childDirection='row'
              childSpacing={spacing[4]}
              childAlign='baseline'
              grow>
              <h4>created by</h4><h2>{ creator.name }</h2>
            </Box>
            <em>{ format(createdAt, 'MMM Do, YYYY, h:mma') }</em>
          </Box>
          {
            sections.map((section, i) => {
              let sectionAvailable = !section.drawer || section.drawer.id === currentUser.id
              if (isComplete) sectionAvailable = false

              return (
                <Box
                  key={i}
                  style={{
                    padding: '20px',
                    borderWidth: '0 0 1px',
                    borderColor: 'whitesmoke',
                    '&:hover': {
                      backgroundColor: 'hsl(0, 0%, 98%)'
                    }
                  }}
                >
                  { section.drawer ? `[${section.description} - ${section.drawer.name}]` : section.description }
                  <em>{ section.drawing && section.drawing.canvas ? 'Complete' : 'Incomplete' }</em>
                  { (!isComplete && sectionAvailable) && <button onClick={() => this.handleDrawing(section)}>Draw this section</button> }
                </Box>
              )
            })
          }
        </Box>
        {finalDrawing}
      </div>
    )
  }

  handleDrawing(section) {
    const { dispatch, currentUser, corpse } = this.props
    if (corpse.status === 'complete') { return }
    if (section.drawer && section.drawer.id === currentUser.id) {
      dispatch(push(`/drawing/${section.drawing._id}`))
    }
    if (!section.drawer) {
      dispatch(drawingCreate(section._id))
    }
  }

  handleDestroy() {
    const { dispatch, corpse } = this.props
    const confirmed = confirm('Are you sure you want to delete this corpse?')
    if (confirmed) dispatch(corpseDestroy(corpse._id))
  }

}

Corpse.propTypes = {
  dispatch: PropTypes.func,
  corpse: PropTypes.object,
  currentUser: PropTypes.object,
  corpseId: PropTypes.string,
}

function mapStateToProps(state, props) {
  return {
    corpse: state.corpse,
    corpseId: props.match.params.corpseId,
    drawing: state.drawing.result,
    currentUser: state.users.currentUser,
  }
}

export default connect(mapStateToProps)(Corpse)
