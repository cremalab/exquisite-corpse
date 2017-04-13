import React from 'react'
import PropTypes from 'prop-types'
import corpsesLoad from 'actions/corpsesLoad'
import { connect } from 'react-redux'
import Spinner from 'react-md-spinner'
import Button from 'react-bootstrap/lib/Button'
import Box from 'react-boxen'
import ItemCorpse from 'components/ItemCorpse'
import ChatMessages from 'components/ChatMessages'
import propTypesCorpse from 'propTypes/Corpse'
import {push} from 'react-router-redux'
import { isBefore } from 'date-fns'
import ConnectedUsers from 'components/ConnectedUsers'

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
        <Box><Button
          onClick={() => dispatch(push('/create'))}
        >
          Create Corpse
        </Button></Box>
      </Box>
      <Box
        align='flex-start'
        childWrap="wrap"
        childWrapLastGrow={false}
        childSpacing="10px"
        childBasis="300px"
        childAlign="flex-start"
        childDirection="row"
      >
        { result.sort((a, b) => {
          if (isBefore(a.createdAt, b.createdAt)) return 1
          return -1
        }).map(corpse =>
          <ItemCorpse grow='1' key={corpse._id} corpse={corpse} />
        )}
      </Box>
      <ConnectedUsers />
      <ChatMessages />
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
