import React from 'react'
import { loadCorpses, createCorpse } from 'actions/corpses'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

class Corpses extends React.Component {
  componentWillMount() {
    this.props.dispatch(loadCorpses())
  }
  render() {
    const { corpses: { result, loading } } = this.props

    if ( loading ) return <CircularProgress />

    return <div>
      {
        result.map((corpse, i) => {
          return <ListItem
            key={i}
            primaryText={`Corpse with ${corpse.sections.length} spots`}
            containerElement={<Link to={`/corpse/${corpse._id}`} />}
          />
        })
      }
      <RaisedButton
        onClick={() => this.props.dispatch(createCorpse())}
        label="Create Corpse"
      />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    corpses: state.corpses
  }
}

Corpses = connect(mapStateToProps)(Corpses)

export default Corpses;
