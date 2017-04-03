import React from 'react'
import { connect } from 'react-redux'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Spinner from 'react-md-spinner'
import { push } from 'react-router-redux'
import { loadCorpse } from '../../actions/corpses'
import { createDrawing } from '../../actions/drawings'
import Surface from '../Surface'

class Corpse extends React.Component {
  componentWillMount() {
    const { dispatch, corpseId } = this.props
    dispatch(loadCorpse(corpseId))
  }

  render() {
    const { dispatch, drawing, corpseId, corpse: { loading, sections, status } } = this.props

    if ( loading ) return <Spinner />
    const finalDrawing = status === 'complete' ? (
      <Surface drawing={this.props.corpse} height={200 * 4 + 'px'} />
    ) : null

    return (
      <div>
        <ListGroup>
          {
            sections.map((section, i) => (
              <ListGroupItem
                key={i}
                onClick={() => this.handleDrawing(section)}
              >
                { section.drawer ? `[${section.description} - ${section.drawer.name}]` : section.description }
              </ListGroupItem>
            ))
          }
        </ListGroup>
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

function mapStateToProps(state, props) {
  return {
    corpse: state.corpse,
    corpseId: props.match.params.corpseId,
    drawing: state.drawing.result,
    currentUser: state.users.currentUser,
  }
}

export default connect(mapStateToProps)(Corpse)
