import React, { Component } from 'react'
import {Provider} from 'react-redux'
import store, { history} from 'store'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import sockets from 'actions/sockets'

// Route Components
import RouteApp from 'components/RouteApp'

sockets()

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route component={RouteApp} />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
