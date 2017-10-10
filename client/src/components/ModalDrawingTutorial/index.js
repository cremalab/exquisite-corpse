import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import DrawingSectionName from '../DrawingSectionName'
import Button from '../Button'
import Box from 'react-boxen'
import ItemCorpseSections from 'components/ItemCorpseSections'
import uiDismissTutorial from 'actions/uiDismissTutorial'
import spacing from 'config/spacing'
import colors from 'config/colors'
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
  },
  image: {
    maxWidth: '100%',
  }
}

const exampleFileName = (corpse, section) => {
  if (!corpse || !section) { return null }
  const selectedSection = corpse.sections
    .filter(x => x._id === section)
  if (selectedSection.length === 0) { return null }
  const sectionName = selectedSection[0].description.toLowerCase()
  const supported = ['head', 'torso', 'legs']
  if (supported.indexOf(sectionName) > -1) {
    return `guide-example-${sectionName}`
  } else {
    return `guide-example-head`
  }
}

const ModalDrawingTutorial = ({
  isOpen,
  corpse,
  section,
  timeWindow,
  uiDismissTutorial,
}) =>
  <ReactModal contentLabel='tutorial' shouldCloseOnOverlayClick={true} isOpen={isOpen} style={styles.modal}>
    <Box childSpacing={spacing[8]} align='center'>
      { section && <DrawingSectionName grow corpse={corpse} section={section} prefix={'You are drawing '} /> }
      { corpse && <ItemCorpseSections noClick={true} showCarrot grow basis={300} corpse={corpse} />  }
      <p style={styles.paragraph}>
        For best results, connect your exterior lines to the
        <span style={{color: colors['danger']}}> red guide points</span>.
      </p>
      { section && <p style={styles.paragraph}>
        <img style={styles.image} src={`https://exq-corpse.s3.amazonaws.com/assets/${exampleFileName(corpse, section)}.png`} />
      </p> }
      <p style={styles.paragraph}>
        You will have {timeWindow / 1000 / 60} minutes from your last stroke to commit your drawing,
        otherwise it will expire and someone else will be able to draw this section.</p>
      <Box grow align='center'>
        <Button grow style={{fontSize: '24px'}} onClick={uiDismissTutorial}>Got it!</Button>
      </Box>
    </Box>
  </ReactModal>

ModalDrawingTutorial.propTypes = {
  isOpen: PropTypes.bool,
  corpse: PropTypes.object,
  section: PropTypes.string,
  timeWindow: PropTypes.number,
  uiDismissTutorial: PropTypes.func,
}

ModalDrawingTutorial.defaultProps = {
  corpse: {}
}

export default connect(null, { uiDismissTutorial })(ModalDrawingTutorial)
