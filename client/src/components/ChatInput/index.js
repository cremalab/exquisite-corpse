import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import spacing from 'config/spacing'

const Form = styled.form`
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  border: none;
  background: white;
  font-size: ${spacing[5]};
  padding: ${spacing[4]};
  border-radius: ${spacing[3]}
  box-shadow: 0 0 ${spacing[3]} hsl(0, 0%, 80%)
`

const renderInput = props =>
  <Input placeholder='Type your message...' type="text" {...props.input} />

class ChatInput extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Field name="message" component={renderInput} />
      </Form>
    )
  }
}

ChatInput.propTypes = {
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'chatInput'  // a unique identifier for this form
})(ChatInput)
