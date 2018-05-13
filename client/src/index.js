import React from 'react';
import ReactDom from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App.jsx';

ReactDom.render(
  ( <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
), document.getElementById('app')

);
