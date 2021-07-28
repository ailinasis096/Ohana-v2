import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
  makeStyles,
  Paper
} from '@material-ui/core';

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

const UserDetails = ({ className, onBack, onNext, ...rest }) => {
  const classes = useStyles();

  const [error, setError] = useState(null);

  return (
    <Formik
      initialValues={{
        projectName: '',
        ubication: '',
        description: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        projectName: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(255)
          .required('Required'),
        ubication: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(255)
          .required('Required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Call API to store step data in server session
          // It is important to have it on server to be able to reuse it if user
          // decides to continue later.
          setStatus({ success: true });
          setSubmitting(false);

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
                onChange={value => setFieldValue('description', value)}
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
          {error && (
            <Box mt={2}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}
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
