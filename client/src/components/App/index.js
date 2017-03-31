import React, {Component} from 'react'
import {Subscribe} from 'react-nes'
import Box from 'react-boxen'

class App extends Component {
  render() {
    return (
      <Box height='100%'>
        <Box
          backgroundColor='whitesmoke'
          padding='20px'>
          <header>Exquisite Corpse</header>
        </Box>
        <Subscribe path={`/lobby`} handler={this.handleLobby} />
        <div>
          { this.props.children }
        </div>
      </Box>
    )
  }
  handleLobby(data) {
    console.log("lobby", data)
  }
}

export default App;
