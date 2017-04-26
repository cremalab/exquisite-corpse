import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import spacing from 'config/spacing'
import colors from 'config/colors'

const Input = styled.input`
  width: 100%;
  border: none;
  background: white;
  font-size: ${spacing[5]};
  padding: ${spacing[4]};
  border-radius: ${spacing[3]};
  box-shadow: 0 0 ${spacing[3]} hsl(0, 0%, 80%);
  border: 1px solid white;
  &:focus {
    outline: 0;
    border-color: ${props => colors[`${props.skin}-tint-3`]};
  }
`

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
      <Input {...input} {...rest} type={type} placeholder={placeholder || label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

InputField.defaultProps = {
  skin: 'secondary'
}

InputField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
}

export default InputField
