import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Box from 'react-boxen'

class App extends Component {
  render() {
    return (
      <Box height="100%">
        <Box
          backgroundColor="#C3C1AA"
          color="white"
          padding="20px"
        >
          <header><Link to="/">Scribble Corpse</Link></header>
        </Box>
        <Box color="white">
          { this.props.children }
        </Box>
      </Box>
    )
  }
}

export default App
