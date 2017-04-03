import React from 'react'
import { connect } from 'react-redux'
import Surface from '../Surface'
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
    const { dispatch, drawing, corpseId, corpse: { loading, sections, canvas } } = this.props

    if ( loading ) return <Spinner />
    const finalDrawing = canvas ? (
      <Surface drawing={this.props.corpse} height={200 * 4 + 'px'} />
    ) : null

    return <div><ListGroup>
      {
        sections.map((section, i) => {
          return <ListGroupItem
            key={i}
            onClick={() => this.createDrawing(section)}
          >
            { section.drawer ? `[${section.description} - ${section.drawer}]` : section.description }
          </ListGroupItem>
        })
      }
    </ListGroup>
    {finalDrawing}
    </div>
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
