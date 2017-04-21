import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'
import styled from 'styled-components'
import spacing from 'config/spacing'
import colors from 'config/colors'
import * as corpseHelpers from 'helpers/corpse'

const Label = styled.div`
  padding: ${spacing[3]} ${spacing[6]};
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid ${colors.primary};
  border-radius: ${spacing[4]};
  text-align: center;
`

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
          shrink
          childFlex
          childGrow
          childSpacing={spacing[3]}>
          {
            isComplete
              ? <img data-shrink data-grow src={corpse.svgUrl} width="100%" />
              : corpse.sections.map((section) => {

                const status = corpseHelpers.sectionStatus(section)
                const statusLabel = corpseHelpers.statusToLabel(status)

                return <Box
                  grow
                  shrink
                  key={section._id}
                  childAlign='center'
                  childJustify='center'
                  css={`
                    ${corpseHelpers.statusToBackground(status)}
                  `}>
                   <Label>
                     <p>{section.description}</p>
                     <small>{statusLabel}</small>
                   </Label>
                </Box>
              })
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
