import React from 'react'
import PropTypes from 'prop-types'
import corpseCreate from 'actions/corpseCreate'
import Box from 'react-boxen'
import { reduxForm, FieldArray } from 'redux-form'
import InputCorpseSection from '../InputCorpseSection'
import {FORM_CREATE_CORPSE as form} from 'config/constants'
import Button from 'components/Button'
import spacing from 'config/spacing'

const anchorPoints = {
  2: [40,60],
  3: [40,50,60],
  4: [30,40,60,70],
  5: [30,40,50,60,70]
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
    return (
      <Box
        css={`
          padding: ${spacing[8]};
          max-width: 400px;
          margin: 0 auto;
        `}>
        <form onSubmit={handleSubmit}>
          <Box childSpacing={spacing[6]}>
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
              <Button wide type="submit">Submit</Button>
            </Box>
          </Box>
        </form>
      </Box>
    )
  }
}

RouteCreateCorpse.propTypes = {
  handleSubmit: PropTypes.func
}

export default reduxForm(formConfig)(RouteCreateCorpse)
