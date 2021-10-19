import React from 'react';
import App from './App';
import { SnackbarProvider } from 'notistack';

const AppContainer = () => (
    <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
    }}
    >
        <App/>
    </SnackbarProvider>
);

export default AppContainer;
