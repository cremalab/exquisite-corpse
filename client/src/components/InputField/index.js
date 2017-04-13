import React, { PropTypes } from 'react'

const InputField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={placeholder || label}/>
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
