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
    this.props.dispatch(loadCorpse('58cc32a4bbf3b742adf1bbb8'))
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

function mapStateToProps(state) {
  return {
    corpse: state.corpse
  }
}

Corpse = connect(mapStateToProps)(Corpse)

export default Corpse;
