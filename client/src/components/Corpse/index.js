import React from 'react'
import { connect } from 'react-redux'
import Draw from '../Draw'
import { loadCorpse } from 'actions/corpses'
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router-dom'

class Corpse extends React.Component {
  componentWillMount() {
    const { dispatch, corpseId } = this.props
    dispatch(loadCorpse(corpseId))
  }

  render() {
    const { corpse: { loading, drawings } } = this.props

    if ( loading ) return <CircularProgress />

    return <List>
      <Subheader>Choose a drawing</Subheader>
      {
        drawings.map((drawing, i) => {
          return <ListItem
            key={i}
            primaryText={drawing.description}
            containerElement={<Link to={`/drawing/${drawing._id}`} />}
          />
        })
      }
    </List>
  }
}

function mapStateToProps(state, props) {
  return {
    corpse: state.corpse,
    corpseId: props.match.params.corpseId
  }
}

Corpse = connect(mapStateToProps)(Corpse)

export default Corpse;
