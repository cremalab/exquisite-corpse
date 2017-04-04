import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'

class ItemCorpse extends PureComponent {
  render() {
    const { dispatch, corpse } = this.props
    const openSections = corpse.sections.filter((section) => {
      return !section.drawer
    })
    return (
      <Box
        backgroundColor='hsl(0, 0%, 98%)'
        borderRadius='6px'
        padding='10px'
        onClick={() => dispatch(push(`/corpse/${corpse._id}`))}
        css={`
          cursor: pointer;
          &:hover {
            background-color: hsl(0, 0%, 95%)
          }
        `}>
        <Box>
          <p>Corpse with {openSections.length}/{corpse.sections.length} open spots</p>
          <p>Created by {corpse.creator.name} on {corpse.createdAt}</p>
          <cite>{corpse.status}</cite>
        </Box>
      </Box>
    )
  }
}

export default connect()(ItemCorpse)
