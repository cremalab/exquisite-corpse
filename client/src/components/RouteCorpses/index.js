import React from 'react'
import { loadCorpses, createCorpse } from 'actions/corpses'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Spinner from 'react-md-spinner'
import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import {push} from 'react-router-redux';

class Corpses extends React.Component {
  componentWillMount() {
    this.props.dispatch(loadCorpses())
  }
  render() {
    const {dispatch, corpses: { result, loading } } = this.props

    if ( loading ) return <Spinner />

    return <div>
      <ListGroup>
        {
          result.map((corpse, i) => {
            return <ListGroupItem
              key={i}
              children={`Corpse with ${corpse.sections.length} spots`}
              onClick={() => dispatch(push(`/corpse/${corpse._id}`))}
            />
          })
        }
      </ListGroup>
      <Button
        onClick={() => this.props.dispatch(createCorpse())}
      >Create Corpse</Button>
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
