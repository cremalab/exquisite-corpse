import React, { PropTypes } from 'react'
import { createCorpse } from 'actions/corpses'
import SampleCanvas from '../SampleCanvas';
import { Field, reduxForm } from 'redux-form';
import RangeInput from '../RangeInput';

const defaultPoints = [40,60]

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
        <SampleCanvas>HEAD</SampleCanvas>
        <Field name="range1" step={10} count={2} allowCross={false} component={RangeInput} />
        <SampleCanvas>TORSO</SampleCanvas>
        <Field name="range2" step={10} count={2} allowCross={false} component={RangeInput} />
        <SampleCanvas>LEGS</SampleCanvas>
        <Field name="range3" step={10} count={2} allowCross={false} component={RangeInput} />
        <SampleCanvas>FEET</SampleCanvas>
        <button type="submit">Submit</button>
      </div>
    </form>
  }
}

RouteCreateCorpse = reduxForm({
  form: 'createCorpse',
  initialValues: {
    range1: defaultPoints,
    range2: defaultPoints,
    range3: defaultPoints,
  },
  onSubmit: (values, dispatch) => dispatch(createCorpse(values))
})(RouteCreateCorpse);

export default RouteCreateCorpse;
