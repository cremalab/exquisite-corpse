import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store, {history} from 'store';
import RouteCorpses from 'components/RouteCorpses';
import RouteCorpse from 'components/RouteCorpse';
import { ConnectedRouter, syncHistoryWithStore } from 'react-router-redux';
import RouteAuth from 'components/RouteAuth'
import { BrowserRouter, Route} from 'react-router-dom'
import RouteDrawing from 'components/RouteDrawing'
import RouteHome from 'components/RouteHome'

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/welcome" component={RouteHome}/>
            <RouteAuth exact path="/" component={RouteCorpses}/>
            <RouteAuth path="/corpse/:corpseId" component={RouteCorpse}/>
            <RouteAuth path="/drawing/:drawingId" component={RouteDrawing}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
