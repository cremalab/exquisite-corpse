import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import List from 'components/List'
import FlashMessage from './FlashMessage'
import spacing from 'config/spacing'


const FlashMessages = ({ messages }) => (
  <List data={messages.list} itemSpacing={spacing[4]} itemComponent={FlashMessage} />
)

FlashMessages.propTypes = {
  messages: PropTypes.object
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  }
}

export default connect(mapStateToProps)(FlashMessages)
