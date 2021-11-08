/* eslint-disable no-undef */
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Home from '../../views/home/index';

import './App.css';
import HelmetMetaData from './../HelmetMetaData.component';

const theme = createTheme({
  /** Colors **/
  palette: {
    primary: {
      main: '#5465D1', //violet
      light: 'rgba(84, 101, 209, 0.4)', //lightViolet
      purple: '#8568AE', 
      lighRed: '#E7706A',
      rose: '#B66C8C', 
      text: '#FFF', //white
     },
     secondary: {
      main: '#B66C8C', //rose
     },
     default: {
       main: '#8568AE',
     }
  },
  /** Typographys **/
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
    ].join(','),
  },
});

const App = () => {

  return (
    //<MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
      <div>
          <Router>
            <ThemeProvider theme={theme}>
                  <div className="App__Container">
                    <HelmetMetaData/>
                      <React.Fragment>
                        <Switch>
                          <Route path="/" component={Home} />
                        </Switch>
                      </React.Fragment>
                  </div>
            </ThemeProvider>
          </Router>
      </div>
    //</MuiPickersUtilsProvider>
  );
}

export default App;
