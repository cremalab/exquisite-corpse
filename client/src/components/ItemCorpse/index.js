import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'

const css = {
  container: {
    borderRadius: '6px',
    backgroundColor: '#67B6C8',
    cursor: 'pointer',
  },
  section: {
    opacity: '0.75',
    padding: '20px',
    backgroundColor: 'red'
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
          { corpse.sections.map((section, i) => <Box key={i} style={css.section}>{(section.drawer && section.drawer.name) || 'empty'}</Box>) }
        </Box>
        <Box padding="20px">
          <p><small>Created by j askfkkjjkl alskfjkkjklasdf kjklas djflkj kjask ldfkl klasdfj {corpse.creator.name} {createdAt}</small></p>
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
