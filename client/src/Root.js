import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from 'store';
import Corpses from 'components/Corpses';
import Corpse from 'components/Corpse';
import { syncHistoryWithStore } from 'react-router-redux';
import history from 'config/history'
import RouteAuth from 'components/RouteAuth'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from 'components/Home'

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={syncHistoryWithStore(history, store)}>
          <div>
            <Route exact path="/welcome" component={Home}/>
            <RouteAuth exact path="/" component={Corpses}/>
            <RouteAuth path="/corpse/:corpseId" component={Corpse}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
