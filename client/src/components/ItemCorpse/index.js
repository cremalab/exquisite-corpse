import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import Box from 'react-boxen'

class ItemCorpse extends PureComponent {
  render() {
    const {dispatch, corpse } = this.props
    const openSections = corpse.sections.filter(s => !s.drawing || !s.drawing.canvas)
    return (
      <Box
        backgroundColor='whitesmoke'
        borderRadius='6px'
        padding='10px'
        onClick={() => dispatch(push(`/corpse/${corpse._id}`))}>
        <Box>
          <p>Corpse with {openSections.length}/{corpse.sections.length} open spots</p>
          <p>Created by {corpse.creator.user} on {corpse.createdAt}</p>
          <cite>{corpse.status}</cite>
        </Box>
      </Box>
    )
  }
}

export default connect()(ItemCorpse)
