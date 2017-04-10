import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-md-spinner'
import { push } from 'react-router-redux'
import { loadCorpse, clearCorpse } from '../../actions/corpses'
import { createDrawing } from '../../actions/drawings'
import Surface from '../Surface'
import Box from 'react-boxen'

class Corpse extends Component {
  componentWillMount() {
    const { dispatch, corpseId } = this.props
    dispatch(clearCorpse())
    dispatch(loadCorpse(corpseId))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearCorpse())
  }

  render() {
    const { corpse: { loading, sections, status, size } } = this.props

    if ( loading ) return <Spinner />
    const finalDrawing = (status === 'complete') ? (
      <Surface
        drawing={this.props.corpse}
        height={size.height + 'px'}
        width={size.width + 'px'}
      />
    ) : null
    return (
      <div>
        <Box>
          {
            sections.map((section, i) => (
              <Box
                key={i}
                onClick={() => this.handleDrawing(section)}
                style={{
                  padding: '20px',
                  borderWidth: '0 0 1px',
                  borderColor: 'whitesmoke',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'hsl(0, 0%, 98%)'
                  }
                }}
              >
                { section.drawer ? `[${section.description} - ${section.drawer.name}]` : section.description }
                <em>{ section.drawing && section.drawing.canvas ? 'Complete' : 'Incomplete' }</em>
              </Box>
            ))
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
      dispatch(createDrawing(section._id))
    }
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
