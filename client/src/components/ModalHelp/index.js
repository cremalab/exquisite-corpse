import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Box from 'react-boxen'
import uiModalDismiss from 'actions/uiModalDismiss'
import spacing from 'config/spacing'
import { } from 'date-fns'

const styles = {
  modal: {
    content: {
      maxWidth: '400px',
      height: 'auto',
      margin: '0 auto',
    }
  },
  paragraph: {
    lineHeight: '1.6em'
  }
}

const ModalHelp = ({
  isOpen,
  uiModalDismiss,
}) =>
  <ReactModal contentLabel='help' shouldCloseOnOverlayClick={true} isOpen={isOpen} style={styles.modal}>
    <Box childSpacing={spacing[8]} align='center'>
      <h2>What is this?</h2>
      <p style={styles.paragraph}>
        This is a realtime, multiplayer version of the <a href='https://en.wikipedia.org/wiki/Exquisite_corpse'>exquisite corpse drawing game</a>. A "corpse" is a collaborative drawing made up of multiple named sections (usually head, torso, and legs) that are drawn without context. When all sections have been drawn, the entire corpse is revealed.</p>

        <p>You can <Link to={'/create'}>start your own corpse</Link> or contribute to an existing one by clicking on an open section name in the Lobby.</p>

        <p>Scribble Corpse is an experiment by <a href='http://crema.us'>Crema</a>.</p>
      <Box grow align='center'>
        <Button grow style={{fontSize: '24px'}} onClick={uiModalDismiss}>Got it!</Button>
      </Box>
    </Box>
  </ReactModal>

ModalHelp.propTypes = {
  isOpen: PropTypes.bool,
  corpse: PropTypes.object,
  section: PropTypes.string,
  timeWindow: PropTypes.number,
  uiModalDismiss: PropTypes.func,
}

ModalHelp.defaultProps = {
  corpse: {}
}

export default connect(null, { uiModalDismiss })(ModalHelp)
