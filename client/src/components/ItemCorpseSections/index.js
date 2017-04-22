import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'react-boxen'
import styled from 'styled-components'
import spacing from 'config/spacing'
import colors from 'config/colors'
import * as corpseHelpers from 'helpers/corpse'

const Label = styled.div`
  padding: ${spacing[3]} ${spacing[6]};
  background: ${colors['primary']};
  color: ${colors['white']};
  ${''/* border: ${spacing[3]} solid ${colors['primary-shade-3']}; */}
  border-radius: ${spacing[4]};
  text-align: center;
`

class ItemCorpseSections extends Component {
  render() {
    const { corpse } = this.props
    return (
      <Box
        childFlex>
        {
          corpse.sections.map((section) => {
            const { drawer } = section
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
                  ${corpseHelpers.statusToBackground(status)}
                `}>
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
  corpse: PropTypes.object
}

export default ItemCorpseSections
