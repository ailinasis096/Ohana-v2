import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Link,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import * as Yup from 'yup';
import API from '../../../api/Api'
import Countries from '../../../components/Countries';

const useStyles = makeStyles(() => ({
  root: {},
  div: {
    display: 'flex',
    alignContent: 'center'
  },
  textField: {
    width: '90%'
  },
  span: {
    width: '5%'
  }
}));

const JWTRegister = ({ className, ...rest }) => {
  const classes = useStyles();
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  
  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        country: 1,
        province: '',
        city: '',
        //policy: false,
        //submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Debe ingresar un email válido')
          .max(255)
          .required('Email es requerido'),
        username: Yup.string()
          .max(255)
          .required('Usuario es requerido'),
        password: Yup.string()
          .min(7)
          .max(255)
          .required('Contraseña es requerida'),
        first_name: Yup.string()
          .max(255)
          .required('Nombre es requerido'),
        last_name: Yup.string()
          .max(255)
          .required('Apellido es requerido'),
        phone: Yup.string()
          .max(255)
          .required('Teléfono es requerido'),
        /*country: Yup.string()
          .max(255)
          .required('País es requerido'),*/
        province: Yup.string()
          .max(255)
          .required('Provincia es requerido'),
        city: Yup.string()
          .max(255)
          .required('Ciudad es requerido'),
        //policy: Yup.boolean().oneOf([true], '¡Debe completar todos los campos!')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log('values: ', values)
        values.country = 1;
        try {
          await API.singUp(values);
          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
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
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Correo electrónico"
            margin="normal"
            name="email"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            //value={values.email}
            value='codob54235@wawue.com'
            variant="outlined"
          />
          <div className={classes.div}>
          <TextField
            className={classes.textField}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
            label="Usuario"
            margin="normal"
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            //value={values.username}
            value='codob'
            variant="outlined"
          />
          <span className={classes.span}/>
          <TextField
            className={classes.textField}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Contraseña"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            //value={values.password}
            value='codob444'
            variant="outlined"
          />
          </div>
          <div className={classes.div}>
          <TextField
            error={Boolean(touched.first_name && errors.first_name)}
            className={classes.textField}
            fullWidth
            helperText={touched.first_name && errors.first_name}
            label="Nombre"
            margin="normal"
            name="first_name"
            onBlur={handleBlur}
            onChange={handleChange}
            //value={values.first_name}
            value='Marcos'
            variant="outlined"
          />
          <span className={classes.span}/>
          <TextField
            error={Boolean(touched.last_name && errors.last_name)}
            fullWidth
            className={classes.textField}
            helperText={touched.last_name && errors.last_name}
            label="Apellido"
            margin="normal"
            name="last_name"
            onBlur={handleBlur}
            onChange={handleChange}
            //value={values.last_name}
            value='Sanchez'
            variant="outlined"
          />
          </div>
          <div className={classes.div}>
          <TextField
            error={Boolean(touched.phone && errors.phone)}
            className={classes.textField}
            fullWidth
            helperText={touched.phone && errors.phone}
            label="Teléfono"
            margin="normal"
            name="phone"
            onBlur={handleBlur}
            onChange={handleChange}
            //value={values.phone}
            value='+543513845632'
            variant="outlined"
          />
          <span className={classes.span}/>
          <Countries></Countries>
          </div>
          <div className={classes.div}>
          <TextField
            className={classes.textField}
            error={Boolean(touched.province && errors.province)}
            fullWidth
            helperText={touched.province && errors.province}
            label="Provincia"
            margin="normal"
            name="province"
            onBlur={handleBlur}
            onChange={handleChange}
            //value={values.province}
            value='Córdoba'
            variant="outlined"
          />
          <span className={classes.span}/>
          <TextField
            error={Boolean(touched.city && errors.city)}
            className={classes.textField}
            fullWidth
            helperText={touched.city && errors.city}
            label="Ciudad"
            margin="normal"
            name="city"
            onBlur={handleBlur}
            onChange={handleChange}
            //value={values.city}
            value='Córdoba'
            variant="outlined"
          />
          </div>
          <Box alignItems="center" display="flex" mt={2} ml={-1}>
            <Checkbox
              //checked={values.policy}
              checked
              name="policy"
              //onChange={handleChange}
            />
            <Typography variant="body2" color="textSecondary">
              Debe aceptar los{' '}
              <Link component="a" href="#" color="secondary">
                Terminos y Condiciones
              </Link>
            </Typography>
          </Box>
          {/*Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>{errors.policy}</FormHelperText>
          )*/}
          {/*errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )*/}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Aceptar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

JWTRegister.propTypes = {
  className: PropTypes.string
};

export default JWTRegister;
