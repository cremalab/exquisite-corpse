import React, { PropTypes } from 'react'
import corpseCreate from 'actions/corpseCreate'
import { Field, reduxForm, FieldArray } from 'redux-form'
import InputCorpseSection from '../InputCorpseSection'
import {FORM_CREATE_CORPSE as form} from 'config/constants'

const anchorPoints = [40,60]
const onSubmit = (values, dispatch) => dispatch(corpseCreate(values))
const initialValues = {
  sections: [
    { description: 'Head' , anchorPoints },
    { description: 'Torso', anchorPoints },
    { description: 'Legs' , anchorPoints },
  ],
}
const validate = values => {
  const errors = {}
  errors.sections = values.sections.map(val => ({
    description: val.description ? null : "Required"
  }))
  return errors
}
const formConfig = {form, initialValues, onSubmit, validate}

class RouteCreateCorpse extends React.Component {
  render() {
    const {handleSubmit} = this.props;
    return <form onSubmit={handleSubmit}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2>Create a Corpse</h2>
        <p>
          Use the guides to choose where you want each canvas' drawing
          to begin and end.
        </p>
        <FieldArray
          name="sections"
          initialPoints={anchorPoints}
          component={InputCorpseSection}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  }
}

RouteCreateCorpse.propTypes = {
  handleSubmit: PropTypes.func
}

RouteCreateCorpse = reduxForm(formConfig)(RouteCreateCorpse);

export default RouteCreateCorpse;
