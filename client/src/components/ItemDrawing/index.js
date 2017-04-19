import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'
import styled from 'styled-components'
import { spacing, colors } from 'config/styles'
import Surface from 'components/Surface'

// const Label = styled.div`
//   padding: ${spacing[3]} ${spacing[6]};
//   background: rgba(255, 255, 255, 0.8);
//   border: 2px solid ${colors.primary};
//   border-radius: ${spacing[4]};
//   text-align: center;
// `
//
// const sectionStatus = section => {
//   if(section.drawer && (!section.drawing || !section.drawing.canvas)) {
//     return 'claimed'
//   } else if(section.drawing) {
//     return 'complete'
//   } else {
//     return 'available'
//   }
// }
//
// const statusToLabel = status => {
//   switch(status) {
//     case 'available':
//       return 'Open'
//     case 'claimed':
//       return 'In Progress'
//     case 'complete':
//       return 'Complete'
//     default:
//       return 'Waiting'
//   }
// }

// const statusToBackground = status => {
//   switch(status) {
//     case 'available':
//       return 'white'
//     case 'claimed':
//       return `
//         background-image: -webkit-repeating-radial-gradient(center center, ${colors['primary']}, ${colors['primary']} 1px, transparent 1px, transparent 100%);
//         background-size: 3px 3px;
//       `
//     case 'complete':
//       return `
//         background-color: ${colors.primary}
//       `
//     default:
//       return 'white'
//   }
// }
//
// function onlyUnique(value, index, self) {
//   return self.indexOf(value) === index;
// }

const css = {
  surface: {
    margin: '0 auto',
  },
  statusBox: `
    background-image: -webkit-repeating-radial-gradient(center center, ${colors['blue-tint-1']}, ${colors['blue-tint-1']} 1px, transparent 1px, transparent 100%);
    background-size: 3px 3px;
    font-size: ${spacing[5]};
    padding: ${spacing[4]};
    color: ${colors.blue};
    text-shadow: 0 0 6px #fff;
  `
}

class ItemDrawing extends Component {
  render() {
    const { dispatch, drawing } = this.props

    const createdAt = 'Created ' + distanceInWordsToNow(drawing.createdAt) + ' ago'
    const isComplete = drawing.status === 'complete'

    return (
      <Box
        childFlex
        onClick={() => dispatch(push(`/drawing/${drawing._id}`))}
        css={`
          border-radius: 6px;
          border: 2px solid ${colors['blue-tint-1']};
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
            <Surface style={css.surface} drawing={drawing} width={400} />
        </Box>
        <Box
          childDirection='row'
          childWrap='wrap'
          css={ css.statusBox }>
          <span data-grow>
            { isComplete ? 'Complete' : 'Incomplete' }
          </span>
          <span>{createdAt}</span>
        </Box>
      </Box>
    )
  }
}

ItemDrawing.propTypes = {
  dispatch: PropTypes.func,
  drawing: PropTypes.object
}

export default connect()(ItemDrawing)
