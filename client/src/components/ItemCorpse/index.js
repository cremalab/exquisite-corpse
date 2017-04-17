import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'
import styled from 'styled-components'
import { spacing, colors } from 'config/styles'

const Label = styled.div`
  padding: ${spacing[3]} ${spacing[6]};
  background: white;
  border: 2px solid ${colors.primary};
  border-radius: ${spacing[4]};
  text-align: center;
`

const sectionStatus = section => {
  if(section.drawer && !section.drawing.canvas) {
    return 'claimed'
  } else if(section.drawing) {
    return 'complete'
  } else {
    return 'available'
  }
}

const statusToLabel = status => {
  switch(status) {
    case 'available':
      return 'Open'
    case 'claimed':
      return 'In Progress'
    case 'complete':
      return 'Complete'
    default:
      return 'Waiting'
  }
}

const statusToBackground = status => {
  switch(status) {
    case 'available':
      return 'white'
    case 'claimed':
      return `
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 12.5%, ${colors['primary']} 12.5%, ${colors['primary']} 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%, ${colors['primary']} 62.5%, ${colors['primary']});
        background-repeat: repeat;
      `
    case 'complete':
      return `
        background-image: -webkit-repeating-radial-gradient(center center, ${colors['primary']}, ${colors['primary']} 1px, transparent 1px, transparent 100%);
        background-size: 3px 3px;
      `
    default:
      return 'white'
  }
}

class ItemCorpse extends Component {
  render() {
    const { dispatch, corpse } = this.props

    const createdAt = 'Created ' + distanceInWordsToNow(corpse.createdAt) + ' ago'
    const sectionsWithDrawer = corpse.sections.filter(x => x.drawer)
    const participantsCount = sectionsWithDrawer.length
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

                const status = sectionStatus(section)
                const statusLabel = statusToLabel(status)

                return <Box
                  grow
                  shrink
                  key={section._id}
                  childAlign='center'
                  childJustify='center'
                  css={`
                    ${statusToBackground(status)}
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
          css={`
            font-size: ${spacing[5]};
            padding: ${spacing[4]};
            background: ${colors.primary};
            color: white;
          `}>
          <span data-grow>{participantsCount ? `${participantsCount} participants` : 'Waiting'}</span>
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
