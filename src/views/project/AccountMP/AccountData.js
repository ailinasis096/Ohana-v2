import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AccountMPFormReducer, { initialState, updateFormDataAction } from './AccountMP.reducer'
import {
  Box,
  Button,
  Paper,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  firstInput: {
      marginTop: '35px'
  },
  inputs: {
    marginTop: '23px'
}
}));

const AccountData = ({
  className,
  onBack,
  onComplete,
  ...rest
}) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(AccountMPFormReducer, initialState);
  const [touched, setTouched] = useState({
    publicKey: false,
    accessToken: false,
    clientID: false,
    clientSecret: false
  });


  const handleChange = (property) => ({ target: { value } }) => {
    dispatch(updateFormDataAction({ [property]: value }));
  };

  const handleTouch = (property) => (ev) => {
    setTouched({
      ...touched,
      [property]: true,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    
    try {
      // await api.createEvent(form);
      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      console.error(err);
    } 
  };

  const isValid = 
    state.formData.publicKey !== '' &&
    state.formData.accessToken !== '' &&
    state.formData.clientID !== '' &&
    state.formData.clientSecret !== '' ;

  return (
        <Paper
          elevation={0}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Typography variant="h3" color="textPrimary">
            Datos
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
                Si seguiste el paso a paso detallado en el video anterior agregá los datos solicitados para poder vincular tu campaña a tu cuenta de Mercado Pago y así recibir todas las donaciones.
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
                No te preocupes, los datos requeridos sirven simplemente para vincular tu campaña a tu cuenta de Mercado Pago para que puedas percibir las donaciones. 
                Nadie dentro ni fuera de Ohana podrá ingresar ni obtendrá datos de tu cuenta.
            </Typography>
          </Box>
          <Box mt={2} className={classes.firstInput}>
            <TextField
              fullWidth
              label="Public Key"
              name="publicKey"
              onChange={handleChange('publicKey')}
              variant="outlined"
              helperText={(touched.publicKey && (!state.formData.publicKey || state.formData.publicKey === '')) ? 'Ingrese la public key' : null}
              onFocus={handleTouch('publicKey')}
              error={
                touched.publicKey && !state.formData.publicKey && state.formData.publicKey === ''
                  ? true
                  : false
              }
            />
          </Box>
          <Box mt={2} className={classes.inputs}>
            <TextField
              fullWidth
              label="Access Token"
              name="accessToken"
              onChange={handleChange('accessToken')}
              variant="outlined"
              helperText={(touched.accessToken && (!state.formData.accessToken || state.formData.accessToken === '')) ? 'Ingrese el access token' : null}
              onFocus={handleTouch('accessToken')}
              error={
                touched.accessToken && !state.formData.accessToken && state.formData.accessToken === ''
                  ? true
                  : false
              }
            />
          </Box>
          <Box mt={2} className={classes.inputs}>
            <TextField
              fullWidth
              label="Client ID"
              name="clientID"
              onChange={handleChange('clientID')}
              variant="outlined"
              helperText={touched.clientID && (!state.formData.clientID || state.formData.clientID === '') ? 'Ingrese el client ID': null}
              onFocus={handleTouch('clientID')}
              error={
                touched.clientID && !state.formData.clientID && state.formData.clientID === ''
                  ? true
                  : false
              }
            />
          </Box>
          <Box mt={2} className={classes.inputs}>
            <TextField
              fullWidth
              helperText={touched.clientSecret && (!state.formData.clientSecret || state.formData.clientSecret === '') ? 'Ingrese el client secret' : null}
              label="Client Secret"
              name="clientSecret"
              onChange={handleChange('clientSecret')}
              variant="outlined"
              onFocus={handleTouch('clientSecret')}
              error={
                touched.clientSecret && !state.formData.clientSecret && state.formData.clientSecret === ''
                  ? true
                  : false
              }
            />
          </Box>

          <Box mt={6} display="flex">
            {onBack && (
              <Button onClick={onBack} size="large">
                Atrás
              </Button>
            )}
            <Box flexGrow={1} />
            <Button
              color="secondary"
              disabled={!isValid}
              onClick={handleSubmit}
              variant="contained"
              size="large"
            >
              Listo
            </Button>
          </Box>
        </Paper>
  );
};

AccountData.propTypes = {
    className: PropTypes.string,
    onComplete: PropTypes.func,
    onBack: PropTypes.func
};

AccountData.defaultProps = {
    onComplete: () => {},
    onBack: () => {}
};

export default AccountData;
