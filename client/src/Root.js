import React, { Component } from 'react'
import {Provider} from 'react-redux'
import store, { history} from 'store'
import RouteCorpses from 'components/RouteCorpses'
import RouteCorpse from 'components/RouteCorpse'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import RouteDrawing from 'components/RouteDrawing'
import RouteHome from 'components/RouteHome'
import App from 'components/App'

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App>
            <Route exact path="/welcome" component={RouteHome}/>
            <Route exact path="/" component={RouteCorpses}/>
            <Route path="/corpse/:corpseId" component={RouteCorpse}/>
            <Route path="/drawing/:drawingId" component={RouteDrawing}/>
          </App>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
