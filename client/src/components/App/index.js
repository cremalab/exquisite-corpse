import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Box from 'react-boxen'
import initialize from 'actions/initialize'
import {connect} from 'react-redux'

class App extends Component {
  componentWillMount() {
    this.props.dispatch(initialize())
  }

  render() {
    const { currentUser} = this.props

    if (!currentUser) return null

    return (
      <Box height="100%">
        <Box
          padding="20px"
          style={{
            backgroundColor: '#0A93C4',
            color: 'white'
          }}
        >
          <header><Link to="/">Scribble Corpse</Link></header>
        </Box>
        <div>
          { this.props.children }
        </div>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps)(App)
