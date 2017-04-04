import React from 'react'
import { loadCorpses, createCorpse } from 'actions/corpses'
import { connect } from 'react-redux'
import Spinner from 'react-md-spinner'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import ItemCorpse from 'components/ItemCorpse'

class Corpses extends React.Component {
  componentWillMount() {
    this.props.dispatch(loadCorpses())
  }
  render() {
    const { dispatch, corpses: { result, loading } } = this.props

    // if (loading) return <Spinner />

    return (<Box
      padding="20px"
      childSpacing="20px"
    >
      <Box
        childAlign="center"
        childDirection="row"
        childJustify="space-between"
      >
        <h1>Lobby</h1>
        <Button
          onClick={() => dispatch(createCorpse())}
        >
          Create Corpse
        </Button>
      </Box>
      <Box
        childDirection="row"
        childSpacing="20px"
        childGrow="1"
        childWrap="wrap"
        childWrapLastGrow={false}
        childBasis="200px"
      >
        { result.map(corpse =>
          <ItemCorpse key={corpse._id} corpse={corpse} />,
        )}
      </Box>
    </Box>)
  }
}

function mapStateToProps(state) {
  return {
    corpses: state.corpses,
  }
}

Corpses = connect(mapStateToProps)(Corpses)

export default Corpses
