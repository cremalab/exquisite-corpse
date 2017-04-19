import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'
import { spacing, colors } from 'config/styles'
import Surface from 'components/Surface'

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
