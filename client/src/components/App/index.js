import React, {Component} from 'react'
import {Subscribe} from 'react-nes'

class App extends Component {
  render() {
    return (
      <div>
        <header>Header</header>
        <Subscribe path={`/lobby`} handler={this.handleLobby} />
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
  handleLobby(data) {
    console.log("lobby", data)
  }
}

export default App;
