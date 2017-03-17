import React, { Component } from 'react';
import Draw from '../Draw';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from '../Logo';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          {
            //<AppBar
            //  title={<Logo />}
            //  iconClassNameRight="muidocs-icon-navigation-expand-more"
            ///>
          }
          <Draw />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
