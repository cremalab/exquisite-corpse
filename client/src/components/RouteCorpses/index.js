import React from 'react'
import PropTypes from 'prop-types'
import corpsesLoad from 'actions/corpsesLoad'
import drawingsLoad from 'actions/drawingsLoad'
import { connect } from 'react-redux'
import Spinner from 'react-md-spinner'
import Box from 'react-boxen'
import ItemCorpse from 'components/ItemCorpse'
import ItemDrawing from 'components/ItemDrawing'
import propTypesCorpse from 'propTypes/Corpse'
import {push} from 'react-router-redux'
import { isBefore } from 'date-fns'
import drawingCreate from 'actions/drawingCreate'
import { spacing } from 'config/styles'

class Corpses extends React.Component {
  componentDidMount() {
    this.props.dispatch(corpsesLoad())
    this.props.dispatch(drawingsLoad('incomplete'))
  }
  render() {
    const { dispatch, corpses: { result, loading } } = this.props
    const drawingsLoad = this.props.drawings.loading
    const drawings = this.props.drawings.result

    if (loading === true) return <Spinner />

    return (<Box
      padding={spacing[6]}
      childSpacing={spacing[6]}
      grow='1'
    >
      { drawings.length && <Box childSpacing={spacing[6]}>
        <h3>Your unfinished drawings</h3>
        <Box
          grow
          shrink
          childDirection="row"
          childWrap="wrap"
          childWrapLastGrow={false}
          childSpacing={spacing[4]}
          childBasis="400px"
          childGrow
          childShrink
        >
          { drawingsLoad ? <Spinner /> : drawings.map(d => (
            <ItemDrawing key={d._id} drawing={d} data-shrink data-grow />
          ) )}
        </Box>
      </Box> }
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
        childSpacing={spacing[4]}
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
  }),
  drawings: PropTypes.shape({
    result: PropTypes.arrayOf(PropTypes.object)
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
    drawings: state.drawings,
  }
}

export default connect(mapStateToProps)(Corpses)
