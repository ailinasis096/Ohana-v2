import MomentUtils from '@date-io/moment';
import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Router } from 'react-router-dom';
import GlobalStyles from 'src/components/GlobalStyles';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import ScrollReset from 'src/components/ScrollReset';
import { AuthProvider } from 'src/contexts/JWTAuthContext';
import useSettings from 'src/hooks/useSettings';
import routes, { renderRoutes } from 'src/routes';
import { createTheme } from 'src/theme';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const history = createBrowserHistory();

const App = () => {
  const { settings } = useSettings();

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  });

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider dense maxSnack={3}>
            <Router history={history}>
              <GlobalStyles />
              <ScrollReset />
              <GoogleAnalytics />
              {/* <CookiesNotification /> */}
              {/*  <SettingsNotification /> */}
              {renderRoutes(routes)}
            </Router>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
