import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Box from 'react-boxen'

import uiSetSection from 'actions/uiSetSection'
import Button from 'components/Button'

const SectionNav = ({ sections, ui, uiSetSection }) =>
  <Box childDirection='row' childSpacing={'8px'}>
    { sections.map(s => {
      return (<Button
        key={s.key}
        skin={ ui.activeSection === s.key ? 'tertiary' : 'primary'}
        onClick={() => uiSetSection(s.key)}>
          {s.text}
        </Button>
      )
    })}
  </Box>


SectionNav.propTypes = {
  sections: PropTypes.array,
  ui: PropTypes.object,
  uiSetSection: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    ui: state.ui,
  }
}

export default connect(mapStateToProps, { uiSetSection })(SectionNav)
