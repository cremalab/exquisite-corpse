import React from 'react'
import { connect } from 'react-redux'
import Draw from '../Draw'
import { loadCorpse } from 'actions/corpses'
import { Link } from 'react-router-dom'
import { setDrawing } from 'actions/drawings'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Spinner from 'react-md-spinner'

class Corpse extends React.Component {
  componentWillMount() {
    const { dispatch, corpseId } = this.props
    dispatch(loadCorpse(corpseId))
  }

  render() {
    const { drawing, corpse: { loading, drawings } } = this.props

    if ( loading ) return <Spinner />

    if ( drawing._id ) return <Draw drawing={drawing} />

    return <ListGroup>
      {
        drawings.map((drawing, i) => {
          return <ListGroupItem
            key={i}
            children={drawing.description}
            onTouchTap={() => this.setDrawing(drawing)}
          />
        })
      }
    </ListGroup>
  }

  setDrawing(drawing) {
    const { dispatch } = this.props
    dispatch(setDrawing(drawing))
  }
}

function mapStateToProps(state, props) {
  console.log(state)
  return {
    corpse: state.corpse,
    corpseId: props.match.params.corpseId,
    drawing: state.drawing.result
  }
}

Corpse = connect(mapStateToProps)(Corpse)

export default Corpse;
