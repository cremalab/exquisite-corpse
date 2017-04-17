import React from 'react'
import PropTypes from 'prop-types'
import corpseCreate from 'actions/corpseCreate'
import Box from 'react-boxen'
import { reduxForm, FieldArray } from 'redux-form'
import InputCorpseSection from '../InputCorpseSection'
import {FORM_CREATE_CORPSE as form} from 'config/constants'
import { colors } from 'config/styles'

const anchorPoints = {
  2: [40,60],
  3: [40,50,60],
  4: [30,40,60,70],
  5: [30,40,50,60,70]
}

const css = {
  button: {
    backgroundColor: colors.primary,
    color: 'rgb(255, 255, 255)',
    border: 'none',
    lineHeight: '2em',
    borderRadius: '4px',
    cursor: 'pointer'
  }
}
const onSubmit = (values, dispatch) => dispatch(corpseCreate(values))
const initialValues = {
  sections: [
    { description: 'Head' , anchorPoints: anchorPoints[2] },
    { description: 'Torso', anchorPoints: anchorPoints[2] },
    { description: 'Legs' , anchorPoints: anchorPoints[2] },
  ],
}
const validate = values => {
  const errors = {}
  errors.sections = values.sections.map(val => ({
    description: val.description ? null : 'Required'
  }))
  return errors
}
const formConfig = {form, initialValues, onSubmit, validate}

class RouteCreateCorpse extends React.Component {
  render() {
    const {handleSubmit} = this.props
    return <form onSubmit={handleSubmit}>
      <Box
        style={{ maxWidth: '400px', margin: '0 auto', marginTop: '1em' }}
        childSpacing='10px'>
        <h2>Create a Corpse</h2>
        <p>
          Use the guides to choose where you want each canvas' drawing
          to begin and end.
        </p>
        <FieldArray
          name="sections"
          anchorPoints={anchorPoints}
          component={InputCorpseSection}
        />
        <Box
          padding='10px'>
          <button style={css.button} type="submit">Submit</button>
        </Box>
      </Box>
    </form>
  }
}

RouteCreateCorpse.propTypes = {
  handleSubmit: PropTypes.func
}

RouteCreateCorpse = reduxForm(formConfig)(RouteCreateCorpse)

export default RouteCreateCorpse
