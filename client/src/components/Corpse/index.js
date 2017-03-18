import React from 'react'
import { connect } from 'react-redux'
import Draw from '../Draw'
import { loadCorpse } from 'actions/corpses'
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router-dom'
import { setDrawing } from 'actions/drawings'

class Corpse extends React.Component {
  componentWillMount() {
    const { dispatch, corpseId } = this.props
    dispatch(loadCorpse(corpseId))
  }

  render() {
    const { drawing, corpse: { loading, drawings } } = this.props

    if ( loading ) return <CircularProgress />

    if ( drawing._id ) return <Draw drawing={drawing} />

    return <List>
      <Subheader>Choose a drawing</Subheader>
      {
        drawings.map((drawing, i) => {
          return <ListItem
            key={i}
            primaryText={drawing.description}
            onTouchTap={() => this.setDrawing(drawing)}
          />
        })
      }
    </List>
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
