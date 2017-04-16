import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Box from 'react-boxen'

class ChatInput extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <Box childDirection='row'>
        <form onSubmit={handleSubmit}>
          <Field name="message" component="input" type="text" />
        </form>
      </Box>
    )
  }
}

ChatInput.propTypes = {
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'chatInput'  // a unique identifier for this form
})(ChatInput)
