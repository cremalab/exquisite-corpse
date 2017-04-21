import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import { distanceInWordsToNow } from 'date-fns'
import spacing from 'config/spacing'
import colors from 'config/colors'
import Surface from 'components/Surface'

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class ItemDrawing extends Component {
  render() {
    const { dispatch, drawing, drawing: { status } } = this.props
    const createdAt = 'Created ' + distanceInWordsToNow(drawing.createdAt) + ' ago'
    const bgColor = drawing.status === 'expired' ? colors['gray-tint-1'] : colors['tertiary-shade-2']
    const color = drawing.status === 'expired' ? colors['secondary'] : colors['tertiary-shade-5']
    const css = {
      surface: {
        margin: '0 auto',
      },
      statusBox: `
        background-image: -webkit-repeating-radial-gradient(center center, ${bgColor}, ${bgColor} 1px, transparent 1px, transparent 100%);
        background-size: 3px 3px;
        font-size: ${spacing[5]};
        padding: ${spacing[4]};
        color: ${color};
        text-shadow: 0 0 6px #fff;
      `
    }

    return (
      <Box
        childFlex
        onClick={() => dispatch(push(`/drawing/${drawing._id}`))}
        css={`
          border-radius: 6px;
          border: 2px solid ${bgColor};
          height: 400px;
          background: white;
          cursor: pointer;
          overflow: hidden;
          opacity: ${status === 'expired' ? '0.6' : '1'}
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
            { capitalize(drawing.status) }
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
