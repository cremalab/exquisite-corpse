import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Box from 'react-boxen'

class App extends Component {
  render() {
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
        <Box>
          { this.props.children }
        </Box>
      </Box>
    )
  }
}

export default App
