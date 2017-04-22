import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import Box from 'react-boxen'
import InputRange from '../InputRange'
import InputField from '../InputField'
import Button from 'components/Button'
import colors from 'config/colors'

const InputCorpseSection = ({ fields, meta: { submitFailed }, anchorPoints }) => {

  const showAdd = fields.length < 6
  const onAdd = () => fields.push({ anchorPoints: anchorPoints[2] })

  const css = {
    canvasPlaceholder: {
      height: '160px',
      backgroundColor: colors['white-shade-1'],
    },
    guideButton: {
      backgroundColor: '#fff',
      border: `2px solid ${colors['primary']}`,
      color: colors['primary'],
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
        const onUpdatePoint = calcVal => (e) => {
          e.preventDefault()
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
                  grow
                  childAlign='center'
                  childJustify={showPoints ? 'flex-end' : 'center'}
                  childSpacing='10px'>
                  <Field
                    name={`${section}.description`}
                    type="text"
                    style={{ textAlign: 'center' }}
                    placeholder="Description"
                    component={InputField}
                  />
                  {
                    showRemove &&
                    <Button skin='tertiary' prefix='-' onClick={onRemove}>Remove section</Button>
                  }
                </Box>
                { showPoints &&
                  <Box
                    childDirection='row'
                    childAlign='flex-end'
                    childJustify='center'
                    childSpacing='10px'>
                        <Button skin='secondary' prefix='-' onClick={onUpdatePoint(n => n - 1)}>guide point</Button>
                        <Button skin='secondary' prefix='+' onClick={onUpdatePoint(n => n + 1)}>guide point</Button>
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
        <Button skin='tertiary' prefix='+' onClick={onAdd}>Add Section</Button>
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
