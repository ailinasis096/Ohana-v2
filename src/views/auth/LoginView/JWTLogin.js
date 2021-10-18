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
import ax from '../../../api/Api';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

const JWTLogin = ({ className, ...rest }) => {
  const classes = useStyles();

  const isMountedRef = useIsMountedRef();
  const history = useHistory();

  const login = async logueo => {
    ax.login(logueo).then(response => {
      const user = response.username;
      const token = response.token;
      console.log(token);
      localStorage.setItem('token', token);
      history.push('/app/events/browse');
    });
  };

  return (
    <Formik
      initialValues={{
        username: 'user-1',
        password: 'pass-1',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .max(255)
          .required('Username is required'),
        password: Yup.string()
          .max(255)
          .required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log('values: ', values)
        await login(values);
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
            error={Boolean(touched.username && errors.username)}
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
            error={Boolean(touched.password && errors.password)}
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
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
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
          <Box mt={2}>
            <Alert severity='info'>
              <div>
                Usar <b>ailink</b> y contraseña <b>ailink</b>
              </div>
            </Alert>
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
