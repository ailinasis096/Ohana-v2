import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik, useFormikContext } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import api from '../../../api/Api.js';
import QuillEditor from 'src/components/QuillEditor';

const useStyles = makeStyles(theme => ({
  root: {},
  addTab: {
    marginLeft: theme.spacing(2)
  },
  tag: {
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  datePicker: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const Ottro = () => {
  const { values } = useFormikContext();
  return null;
};

const UserDetails = ({
  setData,
  event,
  className,
  onBack,
  onNext,
  ...rest
}) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  let [categoryOption, setCategoryOption] = useState([]); // Me carga el  json con las opciones
  let [category, setCategory] = useState(1); //Me guarda la opción seleccionada
  const [formValues, setFormValues] = useState(null);

  const initialValues = {
    projectName: '',
    ubication: '',
    description: '',
    submit: null,
  };

  //Obtiene el json con las categorias y las setea en categoryOption
  useEffect(() => {
    api.getCategories().then(response => {
      try {
        setCategoryOption((categoryOption = response));
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  useEffect(() => {
    if (!!event) {
      const loadValues = {
        projectName: event.name,
        ubication: event.location.street,
        description: event.description,
        submit: null,
        category: event.category.id
      };
      setCategory(event.category.id)
      setFormValues(loadValues);
    }
  }, [event]);

  const updateEvent = value => {
    if (!!event) {
      event.description = value;
    }
  };

  const arrangeData = values => {
    setData({
      name: values.projectName || event.name,
      location: {
        address_line: 'Avenida Seve Carmona 128',
        postal_code: 5000,
        street: values.ubication || event.location.street
      },
      description: !!event
        ? event.description
        : values.description.replace(/<\/?[^>]+(>|$)/g, ''),
      image: !!event ? event.image : '',
      category: category
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formValues || initialValues}
      validationSchema={Yup.object().shape({
        projectName: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(255)
          .required('Detalle un nombre de campaña'),
        ubication: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(255)
          .required('Detalle una ubicación'),
        category: Yup.number()
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Call API to store step data in server session
          // It is important to have it on server to be able to reuse it if user
          // decides to continue later.
          setStatus({ success: true });
          setSubmitting(false);

          arrangeData(values);
          if (onNext) {
            onNext();
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
        setFieldValue,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Typography variant="h3" color="textPrimary">
            Información de la Campaña
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
              Información básica de la Campaña
            </Typography>
          </Box>
          <Box mt={2}>
            <TextField
              error={Boolean(touched.projectName && errors.projectName)}
              fullWidth
              helperText={touched.projectName && errors.projectName}
              label="Nombre de la campaña"
              name="projectName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.projectName}
              variant="outlined"
            />

            <Box mt={3} mb={1}>
              <Typography variant="subtitle2" color="textSecondary">
                Descripción
              </Typography>
            </Box>
            <Paper variant="outlined">
              <QuillEditor
                className={classes.editor}
                value={values.description}
                onChange={value => (
                  setFieldValue('description', value), updateEvent(value)
                )}
              />
            </Paper>
          </Box>
          <Box mt={2}>
            <TextField
              error={Boolean(touched.ubication && errors.ubication)}
              fullWidth
              helperText={touched.ubication && errors.ubication}
              label="Ubicación"
              name="ubication"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.ubication}
              variant="outlined"
            />
          </Box>
          <Box mt={2} display="flex" alignItems="center">
            <TextField
              error={Boolean(touched.category && errors.category)}
              fullWidth
              select
              helperText={touched.category && errors.category}
              label="Categoría"
              name="category"
              onBlur={handleBlur}
              onChangeCapture={event => {
                setCategory((category = parseInt(event.target.value)));
              }}
              onChange={handleChange}
              value={values.category}
              variant="outlined"
              SelectProps={{ native: true }}
            >
              <>
                <option defaultValue=" " selected />
                {categoryOption.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </>
            </TextField>
          </Box>
          {error && (
            <Box mt={2}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}
          <Ottro />
          <Box mt={6} display="flex">
            {onBack && (
              <Button onClick={onBack} size="large">
                Cancelar
              </Button>
            )}
            <Box flexGrow={1} />
            <Button
              color="secondary"
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              size="large"
            >
              Siguiente
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func
};

UserDetails.defaultProps = {
  onNext: () => {},
  onBack: () => {}
};

export default UserDetails;
