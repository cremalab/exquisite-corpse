import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Box from 'react-boxen'
import styled from 'styled-components'
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
  render() {
    const { corpse, userId, showCarrot } = this.props
    return (
      <Box
        childFlex>
        {
          corpse.sections.map((section, i) => {
            const { drawer } = section
            const isCurrentUser = drawer.id === userId
            const status = corpseHelpers.sectionStatus(section)
            const statusLabel = corpseHelpers.statusToLabel(status)
            return (
              <Box
                grow
                shrink
                key={section._id}
                childAlign='center'
                childJustify='center'
                css={`
                  position: relative;
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
  showCarrot: PropTypes.bool,
}

function mapStateToProps(state) {
  return {
    userId: state.users.currentUser.id
  }
}

export default connect(mapStateToProps)(ItemCorpseSections)
