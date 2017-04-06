import React, { Component } from 'react'
import Box from 'react-boxen'

class App extends Component {
  render() {
    return (
      <Box height="100%">
        <Box
          padding="20px"
        >
          <header>Exquisite Corpse</header>
        </Box>
        <Box>
          { this.props.children }
        </Box>
      </Box>
    )
  }
}

export default App
