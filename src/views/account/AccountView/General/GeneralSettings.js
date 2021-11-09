import React, { useState, useEffect } from 'react';
import './General.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import API from './../../../../api/Api';
import { STATES } from 'src/constants/constants';
import Countries from '../../../../components/Countries';

const useStyles = makeStyles(() => ({
  root: {}
}));

const GeneralSettings = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedState, setSelectedState] = useState(user.additional_info.province);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(user.additional_info.city);

  const fetchCities = async (state) => {
    try {
      const response = await API.getCities(state);
      setCities(response);
    } catch (e) {
      console.error(e);
    }
  };

  const onStateChange = async (event, selectedState) => {
    setSelectedState(selectedState);
    setSelectedCity('');
    fetchCities(selectedState);
  };
  const onCityChange = async (event, selectedCity) => {
    setSelectedCity(selectedCity);
  };

  useEffect(() => {
    setSelectedCity(user.additional_info.city);
    setSelectedState(user.additional_info.province);
    fetchCities(user.additional_info.province);
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        city: user.additional_info.city || '',
        country: user.additional_info.country.name || '',
        email: user.email || '',
        first_name: user.additional_info.first_name || '',
        last_name: user.additional_info.last_name || '',
        phone: user.additional_info.phone || '',
        province: user.additional_info.province || '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        city: Yup.string().max(255)
          .max(255)
          .required('Una ciudad es requerida'),
        country: Yup.string().max(255)
          .max(255)
          .required('Un país es requerido'),
        email: Yup.string()
          .email('Ingrese un mail válido')
          .max(255)
          .required('El email es requerido'),
        first_name: Yup.string()
          .max(255)
          .required('El nombre es requerido'),
        last_name: Yup.string()
          .max(255)
          .required('El apellido es requerido'),
        phone: Yup.string()
          .max(255)
          .required('Un teléfono es requerido'),
        province: Yup.string()
          .max(255)
          .required('Una provincia es requerida')
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        values.country = 1;
        values.province = selectedState || user.additional_info.province;
        values.city = selectedCity || user.additional_info.city;
        delete values.email;
        try {
          // NOTE: Make API request
          await API.updateInfoUser(user.id, values);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Sus datos han sido actualizados correctamente', {
            variant: 'success'
          });
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
          enqueueSnackbar('Sus datos no se han podido actualizar', {
            variant: 'error'
          });
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
        <form onSubmit={handleSubmit}>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardHeader title='Perfil' />
            <Divider />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.first_name && errors.first_name)}
                    fullWidth
                    helperText={touched.first_name && errors.first_name}
                    label='Nombre'
                    name='first_name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.first_name}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.last_name && errors.last_name)}
                    fullWidth
                    helperText={touched.last_name && errors.last_name}
                    label='Apellido'
                    name='last_name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.last_name}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label='Número de celular'
                    name='phone'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={ touched.email && errors.email}
                    label='Email'
                    name='email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type='email'
                    value={values.email}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Countries type='update' value={values.country} />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    className='autocomplete'
                    sx={{ width: 300 }}
                    options={STATES}
                    inputValue={selectedState}
                    autoHighlight
                    onInputChange={onStateChange}
                    getOptionLabel={(option) => option}
                    renderOption={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        label='Seleccione una provincia'
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password'
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                      className='autocomplete'
                      sx={{ width: 300 }}
                      options={cities}
                      autoHighlight
                      onInputChange={onCityChange}
                      inputValue={selectedCity}
                      getOptionLabel={(option) => option}
                      renderOption={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant='outlined'
                          label='Seleccione una ciudad'
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password'
                          }}
                        />
                      )}
                    />
                </Grid>
                {/*<Grid item md={6} xs={12}>
                  <Typography
                    variant="h6"
                    color="textPrimary"

                  >
                    Hacer pública la cuenta
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"

                  >
                    Significa que cualquier usuario que vea su perfil podrá
                    acceder a su información
                  </Typography>
                  <Switch
                    checked={values.isPublic}
                    edge="start"
                    name="isPublic"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="h6" color="textPrimary">
                    Disponible
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Toggling this will let your teammates know that you are
                    available for acquiring new projects
                  </Typography>
                  <Switch
                    checked={values.canHire}
                    edge="start"
                    name="canHire"
                    onChange={handleChange}
                  />
                </Grid>*/}
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box p={2} display='flex' justifyContent='flex-end'>
              <Button
                color='secondary'
                disabled={isSubmitting}
                type='submit'
                variant='contained'
              >
                Guardar cambios
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
