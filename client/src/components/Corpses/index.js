import React from 'react'
import { loadCorpses, createCorpse } from 'actions/corpses'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


class Corpses extends React.Component {
  componentWillMount() {
    this.props.dispatch(loadCorpses())
  }
  render() {
    return <div>
      Corpses...
      <Link to="/corpse/1">Corpse 1</Link>
      <a onClick={() => this.props.dispatch(createCorpse())}>Create Corpse</a>
    </div>
  }
}

function mapStateToProps() {
  return {}
}

Corpses = connect()(Corpses)

export default Corpses;
