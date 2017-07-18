import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Box from 'react-boxen'
import styled from 'styled-components'
import drawingCreate from 'actions/drawingCreate'
import spacing from 'config/spacing'
import colors from 'config/colors'
import * as corpseHelpers from 'helpers/corpse'

const Label = styled.div`
  padding: ${spacing[3]} ${spacing[6]};
  background: ${colors['primary']};
  color: ${colors['white']};
  border-radius: ${spacing[4]};
  text-align: center;
`

const Carrot = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  border-width: ${spacing[6]};
  border-color: transparent transparent transparent white;
  border-style: solid;
  transform: translate(0, -50%);
`

class ItemCorpseSections extends PureComponent {
  handleDrawing(section) {
    const { dispatch, userId, corpse, noClick } = this.props
    if (noClick) { return }
    if (corpse.status === 'complete') { return }
    if (section.drawer && section.drawer.id === userId) {
      dispatch(push(`/drawing/${section.drawing._id}`))
    }
    if (!section.drawer) {
      dispatch(drawingCreate(section._id))
    }
  }

  render() {
    const { corpse, userId, sectionId, showCarrot, noClick } = this.props
    return (
      <Box
        childFlex>
        {
          corpse.sections.map((section, i) => {
            const { drawer, _id } = section
            const isCurrentUser =
              (drawer && drawer.id === userId) &&
              (sectionId === _id)
            const status = corpseHelpers.sectionStatus(section)
            const statusLabel = corpseHelpers.statusToLabel(status)
            const mayInteract = !noClick && (drawer && drawer.id === userId) || (!drawer)
            return (
              <Box
                grow
                shrink
                key={section._id}
                childAlign='center'
                childJustify='center'
                onClick={() => this.handleDrawing(section)}
                css={`
                  position: relative;
                  cursor: ${mayInteract ? 'pointer' : 'default' };
                  ${corpseHelpers.statusToBackground(status, i)}
                `}>
                { showCarrot && isCurrentUser && <Carrot /> }
                <Label>
                 <p>{section.description}</p>
                 <small>
                   <p><em>{statusLabel}</em></p>
                   { drawer && <p>Artist: {drawer.name}</p> }
                 </small>
                </Label>
              </Box>
            )
          })
        }
      </Box>
    )
  }
}

ItemCorpseSections.propTypes = {
  corpse: PropTypes.object,
  userId: PropTypes.string,
  sectionId: PropTypes.string,
  showCarrot: PropTypes.bool,
  noClick: PropTypes.bool,
  dispatch: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    userId: state.users.currentUser.id,
    sectionId: state.drawing.result.section,
  }
}

export default connect(mapStateToProps)(ItemCorpseSections)
