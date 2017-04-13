import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import Box from 'react-boxen'
import InputRange from '../InputRange'
import InputField from '../InputField'

const InputCorpseSection = ({ fields, meta: { submitFailed }, anchorPoints }) => {

  const showAdd = fields.length < 6
  const onAdd = () => fields.push({ anchorPoints: anchorPoints[2] })

  const css = {
    canvasPlaceholder: {
      height: '200px',
      backgroundColor: 'rgb(245, 246, 240)',
    },
    guideButton: {
      backgroundColor: '#fff',
      border: '2px solid #96dbfa',
      color: '#41c1fa',
      borderRadius: '6px',
      cursor: 'pointer',
    }
  }

  return <div>
    {
      fields.map((section, i) => {
        const showPoints = i < (fields.length - 1)
        const showRemove = i > 1
        const onRemove = () => fields.remove(i)
        const onUpdatePoint = calcVal => () => {
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

        return <Box key={i}>
          <Box>
            <div>
              <Box
                style={css.canvasPlaceholder}
                padding='10px'>
                <Box
                  grow='1'
                  childAlign='center'
                  childJustify={showPoints ? 'flex-end' : 'center'}
                  childSpacing='10px'>
                  <Field
                    name={`${section}.description`}
                    type="text"
                    placeholder="Description"
                    component={InputField}
                  />
                  {
                    showRemove &&
                    <button type="button" onClick={onRemove}>Remove section</button>
                  }
                </Box>
                { showPoints &&
                  <Box
                    childDirection='row'
                    grow='1'
                    childAlign='flex-end'
                    childJustify='center'
                    childSpacing='10px'>
                        <button style={css.guideButton} type="button" onClick={onUpdatePoint(n => n - 1)}>- guide point</button>
                        <button style={css.guideButton} type="button" onClick={onUpdatePoint(n => n + 1)}>+ guide point</button>
                  </Box>
                }
              </Box>
              { showPoints && <Field
                name={`${section}.anchorPoints`}
                step={10}
                pushable={true}
                component={InputRange}
              /> }
            </div>
          </Box>
        </Box>
      })
    }
    {
      showAdd &&
      <Box
        padding='10px'
        childJustify='center'>
        <button type="button" onClick={onAdd}>Add Section</button>
      </Box>
    }
  </div>
}

InputCorpseSection.propTypes = {
  fields: PropTypes.object,
  meta: PropTypes.object,
  anchorPoints: PropTypes.object,
}

export default InputCorpseSection
