import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import heart from '../../../assets/heart_ohana.png';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  heart: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  content: {
    textAlign: 'left'
  }
}));

const Features = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg" className={classes.heart}>
        <Typography
          component="p"
          variant="overline"
          color="secondary"
          align="center"
        >
          ¡Conoce OHANA!
        </Typography>
        {/*<Typography variant="h1" align="center" color="textPrimary">
          Ayudar nunca fue tan fácil
        </Typography>*/}

        <img src={heart} alt="heart" width="15%" />

        <Box mt={8} className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display="flex" style={{ alignContent: 'flex-start' }}>
                <Avatar className={classes.avatar}>01</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    Iniciar una campaña
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Crea una recaudación de fondos en OHANA en pocos minutos a
                    través de un procedimiento fácil y rápido.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>02</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    Comparte tu historia
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Comparte tu recaudación de fondos para obtener apoyo. Los
                    instrumentos para compartir en redes sociales te ayudarán a
                    obtener visibilidad y donativos.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>03</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    Gestiona tu campaña
                  </Typography>
                  <Typography variant="body1" color="textPrimary" gutterBottom>
                    Recibe notificaciones sobre los nuevos donativos, mantén
                    informados a tus donantes, envía agradecimientos y gestiona
                    las retiradas de fondos.
                  </Typography>
                  <Button
                    variant="outlined"
                    component="a"
                    href="/app"
                    target="_blank"
                  >
                    ¿Querés ver cómo gestionarlas?
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

Features.propTypes = {
  className: PropTypes.string
};

export default Features;
