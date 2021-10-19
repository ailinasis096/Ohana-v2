import {
  Box,
  Button,
  FormHelperText,
  makeStyles,
  TextField
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import * as Yup from 'yup';
import API from '../../../api/Api';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  root: {}
}));

const JWTLogin = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .max(255)
          .required('Ingrese su username'),
        password: Yup.string()
          .max(255)
          .required('Ingrese su contraseña')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const response = await API.login(values); 
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          history.push('/app/events/browse');
        } catch (err) {
          console.error(err);
          if (err.response && err.response.status === 400) {
            enqueueSnackbar( 'Usuario y/o contraseña inválidos', {
              variant: 'error',
            });
          }
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <TextField
            error={Boolean((touched.username && errors.username) || errors.submit)}
            fullWidth
            autoFocus
            helperText={touched.username && errors.username}
            label='Usuario'
            margin='normal'
            name='username'
            onBlur={handleBlur}
            onChange={handleChange}
            type='text'
            value={values.username}
            variant='outlined'
          />
          <TextField
            error={Boolean((touched.password && errors.password) || errors.submit)}
            fullWidth
            helperText={touched.password && errors.password}
            label='Contraseña'
            margin='normal'
            name='password'
            onBlur={handleBlur}
            onChange={handleChange}
            type='password'
            value={values.password}
            variant='outlined'
          />
          <Box mt={2}>
            <Button
              color='secondary'
              disabled={isSubmitting}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
            >
              Ingresar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

JWTLogin.propTypes = {
  className: PropTypes.string
};

export default JWTLogin;
