import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import propTypesCorpse from 'propTypes/Corpse'
import { distanceInWordsToNow } from 'date-fns'

const css = {
  container: `
    borderRadius: 6px;
    background-color: #67B6C8;
    cursor: pointer;
  `,
  section: section => `
    opacity: 0.75;
    padding: 20px;
    background-color: ${section.drawer ? '#0A93C4' : 'hsla(0,0%,100%, 0.25)'};
  `
}

class ItemCorpse extends PureComponent {
  render() {
    const { dispatch, corpse } = this.props
    const createdAt = distanceInWordsToNow(corpse.createdAt)
    return (
      <Box
        childDirection='row'
        onClick={() => dispatch(push(`/corpse/${corpse._id}`))}
        css={css.container}>
        <Box childSpacing='1px' width='200px'>
          { corpse.sections.map((section, i) => <Box key={i} css={css.section(section)}>{(section.drawer && section.drawer.name) || 'empty'}</Box>) }
        </Box>
        <Box padding="20px">
          <p><small>Created by {corpse.creator.name} {createdAt}</small></p>
        </Box>
      </Box>
    )
  }
}

ItemCorpse.propTypes = {
  dispatch: PropTypes.func,
  corpse: propTypesCorpse
}

export default connect()(ItemCorpse)
