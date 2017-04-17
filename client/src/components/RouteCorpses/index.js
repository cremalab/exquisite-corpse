import React from 'react'
import PropTypes from 'prop-types'
import corpsesLoad from 'actions/corpsesLoad'
import { connect } from 'react-redux'
import Spinner from 'react-md-spinner'
import Box from 'react-boxen'
import ItemCorpse from 'components/ItemCorpse'
import propTypesCorpse from 'propTypes/Corpse'
import {push} from 'react-router-redux'
import { isBefore } from 'date-fns'
import drawingCreate from 'actions/drawingCreate'

class Corpses extends React.Component {
  componentDidMount() {
    this.props.dispatch(corpsesLoad())
  }
  render() {
    const { dispatch, corpses: { result, loading } } = this.props

    if (loading === true) return <Spinner />

    return (<Box
      padding="20px"
      childSpacing="20px"
      grow='1'
    >
      <Box
        childAlign="center"
        childDirection="row"
        childJustify="space-between"
      >
        <Box grow='1'><h1>Lobby</h1></Box>
        <Box>
          <button onClick={() => dispatch(drawingCreate())}>Draw</button>
        </Box>
        <Box><button
          onClick={() => dispatch(push('/create'))}
        >
          Create Corpse
        </button></Box>
      </Box>
      <Box
        grow
        shrink
        childDirection="row"
        childWrap="wrap"
        childWrapLastGrow={false}
        childSpacing="10px"
        childBasis="300px"
        childGrow
        childShrink
      >
        { result.sort((a, b) => {
          if (isBefore(a.createdAt, b.createdAt)) return 1
          return -1
        }).map(corpse =>
          <ItemCorpse key={corpse._id} corpse={corpse} />
        )}
      </Box>
    </Box>)
  }
}

Corpses.propTypes = {
  dispatch: PropTypes.func,
  corpses: PropTypes.shape({
    result: PropTypes.arrayOf(PropTypes.shape(propTypesCorpse))
  })
}

Corpses.defaultProps = {
  corpses: {
    result: [],
    loading: false
  }
}

function mapStateToProps(state) {
  return {
    corpses: state.corpses,
  }
}

export default connect(mapStateToProps)(Corpses)
