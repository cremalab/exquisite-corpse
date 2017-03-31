import React from 'react'
import { connect } from 'react-redux'
import Draw from '../Draw'
import { loadCorpse } from 'actions/corpses'
import { createDrawing } from 'actions/drawings'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Spinner from 'react-md-spinner'

class Corpse extends React.Component {
  componentWillMount() {
    const { dispatch, corpseId } = this.props
    dispatch(loadCorpse(corpseId))
  }

  render() {
    const { dispatch, drawing, corpseId, corpse: { loading, sections } } = this.props

    if ( loading ) return <Spinner />

    return <ListGroup>
      {
        sections.map((section, i) => {
          return <ListGroupItem
            key={i}
            onClick={() => this.createDrawing(section)}
          >
            { section.drawer ? `[${section.description}]` : section.description }
          </ListGroupItem>
        })
      }
    </ListGroup>
  }

  createDrawing(section) {
    const { dispatch } = this.props
    if ( !section.drawer )
      dispatch(createDrawing(section._id));
  }

}

function mapStateToProps(state, props) {
  return {
    corpse: state.corpse,
    corpseId: props.match.params.corpseId,
    drawing: state.drawing.result
  }
}

Corpse = connect(mapStateToProps)(Corpse)

export default Corpse;
