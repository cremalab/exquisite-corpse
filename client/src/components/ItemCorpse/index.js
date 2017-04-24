import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'
import spacing from 'config/spacing'
import colors from 'config/colors'
import ItemCorpseSections from 'components/ItemCorpseSections'

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

class ItemCorpse extends Component {
  render() {
    const { dispatch, corpse } = this.props

    const createdAt = 'Created ' + distanceInWordsToNow(corpse.createdAt) + ' ago'
    const sectionsWithDrawer = corpse.sections.filter(x => x.drawer)
    const participantsCount = sectionsWithDrawer.map(s => s.drawer.id)
      .filter(onlyUnique).length
    const isComplete = corpse.status === 'complete'

    return (
      <Box
        childFlex
        onClick={() => dispatch(push(`/corpse/${corpse._id}`))}
        css={`
          border-radius: 6px;
          border: 2px solid ${colors['primary']};
          height: 400px;
          background: white;
          cursor: pointer;
          overflow: hidden;
        `}>
        <Box
          grow
          childFlex
          >
          {
            isComplete
              ? <img data-shrink data-grow src={corpse.svgUrl} width="100%" />
              : <ItemCorpseSections grow corpse={corpse} />
          }
        </Box>
        <Box
          childDirection='row'
          childWrap='wrap'
          css={`
            font-size: ${spacing[5]};
            padding: ${spacing[4]};
            background: ${colors.primary};
            color: white;
          `}>
          <span data-grow>
            {participantsCount ? `${participantsCount} participant${participantsCount > 1 ? 's' : ''}` : 'Waiting'}
          </span>
          <span>{createdAt}</span>
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
