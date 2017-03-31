import React, {Component} from 'react'
import Nes from 'nes'
import {ClientProvider, Connect} from 'react-nes'

const client = new Nes.Client('ws://localhost:8000')

fetch('/nes/auth', { credentials: 'include' })

class Wrapper extends Component {
  render () {
    const { auth, children } = this.props
    return (
      <Connect
        auth={auth}
        onConnect={() => console.log('Local connected')}
      >
        {({ connecting, connected, error, overrideReconnectionAuth, connect, disconnect }) => {
          return (
            children
          )
        }}
      </Connect>
    )
  }
}


const NesConnector = ({ auth, children }) => {
  return (
    <ClientProvider
      client={client}
      onError={console.error}
      onConnect={() => console.log('Global connected')}
      onDisconnect={(willReconnect, log) => console.log('disconnected', willReconnect, log)}
      onUpdate={(message) => console.log('Update', message)}
    >
      <div>
        <Wrapper auth={auth}>{ children }</Wrapper>
      </div>
    </ClientProvider>
  )
}

export default NesConnector;
