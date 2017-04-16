import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error },
  ...rest
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} {...rest} type={type} placeholder={placeholder || label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

InputField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
}

export default InputField
