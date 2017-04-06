import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'

const css = {
  container: {
    borderRadius: '6px',
    backgroundColor: '#0A93C4',
    cursor: 'pointer',
  },
  section: {
    opacity: '0.75',
    padding: '20px',
    backgroundColor: '#67B6C8'
  }
}

class ItemCorpse extends Component {
  render() {
    const { dispatch, corpse } = this.props
    const createdAt = distanceInWordsToNow(corpse.createdAt)
    return (
      <Box
        childDirection='row'
        onClick={() => dispatch(push(`/corpse/${corpse._id}`))}
        style={css.container}>
        <Box childSpacing='1px'>
          { corpse.sections.map((section, i) => <div key={i} style={css.section}>{(section.drawer && section.drawer.name) || 'empty'}</div>) }
        </Box>
        <Box padding="20px" width="25%">
          <p>Created by {corpse.creator.name}</p>
          <p><small>{createdAt}</small></p>
        </Box>
      </Box>
    )
  }
}

ItemCorpse.propTypes = {
  dispatch: PropTypes.func,
  corpse: PropTypes.object
}

export default connect()(ItemCorpse)
