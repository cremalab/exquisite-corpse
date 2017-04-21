import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Box from 'react-boxen'
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

const RouteDrawingSidebar = ({ corpse }) =>
  <Box
    childFlex
    grow>
    {
      corpse.sections.map((section) => {
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
      }
      )
    }
  </Box>

RouteDrawingSidebar.propTypes = {
  corpse: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    corpse: state.corpse,
  }
}

export default connect(mapStateToProps)(RouteDrawingSidebar)
