import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import InputRange from '../InputRange'
import InputField from '../InputField'

const InputCorpseSection = ({ fields, meta: { submitFailed }, initialPoints }) => {

  const showAdd = fields.length < 6
  const onAdd = () => fields.push({ anchorPoints: initialPoints })

  return <div>
    {
      fields.map((section, i) => {
        const showPoints = i < (fields.length - 1)
        const showRemove = i > 1
        const onRemove = () => fields.remove(i)
        return <div key={i}>
          <Field
            name={`${section}.description`}
            type="text"
            component={InputField}
          />
          {
            showRemove &&
            <button type="button" onClick={onRemove}>Remove</button>
          }
          {
            showPoints &&
            <Field
              name={`${section}.anchorPoints`}
              step={10}
              pushable={true}
              component={InputRange}
            />
          }
        </div>
      })
    }
    {
      showAdd &&
      <button type="button" onClick={onAdd}>Add</button>
    }
  </div>
}

InputCorpseSection.propTypes = {
  fields: PropTypes.object,
  meta: PropTypes.object,
  initialPoints: PropTypes.array,
}

export default InputCorpseSection
