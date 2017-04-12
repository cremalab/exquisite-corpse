import React, { PropTypes } from 'react'
import corpseCreate from 'actions/corpseCreate'
import corpsesLoad from 'actions/corpsesLoad'
import { connect } from 'react-redux'
import Spinner from 'react-md-spinner'
import Button from 'react-bootstrap/lib/Button'
import Box from 'react-boxen'
import ItemCorpse from 'components/ItemCorpse'
import ChatMessages from 'components/ChatMessages'
import propTypesCorpse from 'propTypes/Corpse'
import { isBefore } from 'date-fns'

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
    >
      <Box
        childAlign="center"
        childDirection="row"
        childJustify="space-between"
      >
        <Box grow='1'><h1>Lobby</h1></Box>
        <Box><Button
          onClick={() => dispatch(corpseCreate())}
        >
          Create Corpse
        </Button></Box>
      </Box>
      <Box
        childDirection="row"
        childSpacing="20px"
        childGrow="1"
        childWrap="wrap"
        childWrapLastGrow={false}
        childBasis="300px"
      >
        { result.sort((a, b) => {
          if (isBefore(a.createdAt, b.createdAt)) return 1
          return -1
        }).map(corpse =>
          <ItemCorpse key={corpse._id} corpse={corpse} />
        )}
        <ChatMessages />
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
