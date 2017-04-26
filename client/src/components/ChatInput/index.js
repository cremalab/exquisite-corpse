import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import InputField from '../InputField'

const Form = styled.form`
  width: 100%;
`

class ChatInput extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Field
          name="message"
          component={InputField}
          type="text"
          placeholder='Type your message...'
          autoComplete="off"
        />
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
