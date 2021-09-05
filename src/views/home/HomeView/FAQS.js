import {
  Box,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    '& dt': {
      marginTop: theme.spacing(2)
    }
  }
}));

const FAQS = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Typography variant="h1" color="textPrimary">
          Preguntas frecuentes
        </Typography>
        <Box my={3}>
          <Divider />
        </Box>
        <Grid container spacing={3} component="dl">
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="secondary">
              Gestionar Campañas
            </Typography>
            <Box mt={6}>
              <dt>
                <Typography variant="h4" color="textPrimary">
                  ¿Cuántas campañas se pueden tener activas a la vez?
                </Typography>
              </dt>
              <dd>
                <Typography variant="body1" color="textSecondary">
                  No! Podes tener activas tantas campañas como desees.
                </Typography>
              </dd>
            </Box>
            <Box mt={6}>
              <dt>
                <Typography variant="h4" color="textPrimary">
                  ¿Es posible cerrar antes una campaña?
                </Typography>
              </dt>
              <dd>
                <Typography variant="body1" color="textSecondary">
                  Si, las campañas pueden ser cerradas antes del tiempo
                  establecido o antes de cumplir el objetivo propuesto.
                </Typography>
              </dd>
            </Box>
            <Box mt={6}>
              <dt>
                <Typography variant="h4" color="textPrimary">
                  ¿Se requiere tener un usuario registrado para gestionar las
                  campañas?
                </Typography>
              </dt>
              <dd>
                <Typography variant="body1" color="textSecondary">
                  Necesariamente debes tener un usuario.
                </Typography>
              </dd>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="secondary">
              Donar
            </Typography>
            <Box mt={6}>
              <dt>
                <Typography variant="h4" color="textPrimary">
                  ¿Puedo donar en más de una campaña?
                </Typography>
              </dt>
              <dd>
                <Typography variant="body1" color="textSecondary">
                  Por supuesto!. Podes donar en todas las campañas que desees.
                </Typography>
              </dd>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

FAQS.propTypes = {
  className: PropTypes.string
};

export default FAQS;
