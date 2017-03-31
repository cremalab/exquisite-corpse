import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import Box from 'react-boxen'

class ItemCorpse extends PureComponent {
  render() {
    const {dispatch, corpse } = this.props
    console.log(corpse)

    return (
      <Box
        borderRadius='6px'
        padding='10px'
        backgroundColor='white'
        onClick={() => dispatch(push(`/corpse/${corpse._id}`))}>
        <Box>
          <p>Corpse with {corpse.sections.length} spots</p>
          <p>{corpse.creator.user}</p>
        </Box>
      </Box>
    )
  }
}

export default connect()(ItemCorpse)
