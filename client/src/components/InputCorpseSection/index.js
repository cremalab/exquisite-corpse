import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import InputRange from '../InputRange'
import InputField from '../InputField'

const InputCorpseSection = ({ fields, meta: { submitFailed }, anchorPoints }) => {

  const showAdd = fields.length < 6
  const onAdd = () => fields.push({ anchorPoints: anchorPoints[2] })

  return <div>
    {
      fields.map((section, i) => {
        const showPoints = i < (fields.length - 1)
        const showRemove = i > 1
        const onRemove = () => fields.remove(i)
        const onUpdatePoint = calcVal => e => {
          const fieldValues = fields.get(i)
          const newPoints = anchorPoints[calcVal(fieldValues.anchorPoints.length)]
          if ( newPoints ) {
            fields.remove(i)
            fields.insert(i, {
              ...fieldValues,
              anchorPoints: newPoints
            })
          }
        }

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
            <div>
              <button type="button" onClick={onUpdatePoint(n => n - 1)}>-</button>
              <button type="button" onClick={onUpdatePoint(n => n + 1)}>+</button>
              <Field
                name={`${section}.anchorPoints`}
                step={10}
                pushable={true}
                component={InputRange}
              />
            </div>
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
  anchorPoints: PropTypes.object,
}

export default InputCorpseSection
