import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Formik } from 'formik';
import {
  Box,
  Button,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  devBtn: {
      display: 'grid',
      justifyContent: 'center'
  }
}));

const StepByStep = ({
  className,
  onBack,
  onNext,
  ...rest
}) => {
  const classes = useStyles();
  
  return (
    <Formik
      initialValues
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
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Typography variant="h3" color="textPrimary">
            Configuración de la cuenta
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
                El siguiente video te explicará el paso a paso para poder vincular tu campaña a tu cuenta de Mercado Pago y así poder recibir las donaciones sin ningun tipo de retención por parte de Ohana.
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
                Recomendamos ver el video cuantas veces sea necesario y si tenes dudas contactate con el soporte de Ohana.
            </Typography>
          </Box>

          <Box mt={2} className={classes.devBtn}>
            <Button onClick={onBack} size="large" color="secondary" variant="contained" >
                Ingresar a Mercado Pago Dev
            </Button>
          </Box>
          <Box mt={6} display="flex">
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

StepByStep.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func
};

StepByStep.defaultProps = {
  onNext: () => {},
  onBack: () => {}
};

export default StepByStep;