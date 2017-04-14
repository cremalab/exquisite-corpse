import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Box from 'react-boxen'

class ConnectedUsers extends Component {
  render() {
    const { users } = this.props

    const css = {
      container: {
        borderRadius: '6px',
        cursor: 'pointer',
      },
      section: {
        opacity: '0.75',
        padding: '20px',
        backgroundColor: '#67B6C8'
      }
    }

    return (
      <Box
        childDirection='column'
        style={css.container}>
        <h4>In lobby</h4>
        <Box childSpacing='1px'>
          { users.map((user, i) => {
            return <div key={i}>{ user.name } - { user.status }</div>
          }) }
        </Box>
      </Box>
    )
  }
}

ConnectedUsers.propTypes = {
  users: PropTypes.array,
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
  }
}

export default connect(mapStateToProps)(ConnectedUsers)
