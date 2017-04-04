import React, { Component } from 'react'
import Box from 'react-boxen'

class App extends Component {
  render() {
    return (
      <Box height="100%">
        <Box
          backgroundColor="rgba(255, 165, 0, 0.79)"
          color="white"
          padding="20px"
        >
          <header>Exquisite Corpse</header>
        </Box>
        <div>
          { this.props.children }
        </div>
      </Box>
    )
  }
}

export default App
