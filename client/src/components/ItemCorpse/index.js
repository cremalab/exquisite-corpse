import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import propTypesCorpse from 'propTypes/Corpse'

const css = {
  container: `
    padding: 20px;
    borderRadius: 6px;
    background-color: hsl(0, 0%, 98%);
    cursor: pointer;
    &:hover {
      background-color: hsl(0, 0%, 95%)
    }
  `
}

class ItemCorpse extends PureComponent {
  render() {
    const { dispatch, corpse } = this.props
    const openSections = corpse.sections.filter((section) => {
      return !section.drawer
    })
    return (
      <Box
        onClick={() => dispatch(push(`/corpse/${corpse._id}`))}
        css={css.container}>
        <p>Corpse with {openSections.length}/{corpse.sections.length} open spots</p>
        <p>Created by {corpse.creator.name} on {corpse.createdAt}</p>
        <cite>{corpse.status}</cite>
      </Box>
    )
  }
}

ItemCorpse.propTypes = {
  dispatch: PropTypes.func,
  corpse: propTypesCorpse
}

export default connect()(ItemCorpse)
