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
    const { corpse, dispatch } = this.props

    const createdAt = 'Created ' + distanceInWordsToNow(corpse.createdAt) + ' ago'
    const sectionsWithDrawer = corpse.sections.filter(x => x.drawer)
    const participantsCount = sectionsWithDrawer.map(s => s.drawer.id)
      .filter(onlyUnique).length
    const isComplete = corpse.status === 'complete'
    const imgCSS = `
      background: url(${corpse.svgUrl});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    `

    return (
      <Box
        childFlex
        onClick={isComplete ? () => dispatch(push(`/corpse/${corpse._id}`)) : null }
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
          css={imgCSS}
          >
          {
            isComplete
              ? null
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
            z-index: 10;
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
