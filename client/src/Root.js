import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import store from 'store';
import Corpses from 'components/Corpses';
import Corpse from 'components/Corpse';
import Drawing from 'components/Drawing';
import createBrowserHistory from 'history/createBrowserHistory'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Router history={createBrowserHistory()}>
            <div>
              <Route exact path="/" component={Corpses}/>
              <Route path="/corpse/:corpseId" component={Corpse}/>
              <Route path="/drawing/:drawingId" component={Drawing}/>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default Root;
