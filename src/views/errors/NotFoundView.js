import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    paddingTop: 80,
    paddingBottom: 80
  },
  image: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 300,
    height: 'auto'
  }
}));

const NotFoundView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page
      className={classes.root}
      title="404: Not found"
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant={mobileDevice ? 'h4' : 'h1'}
          color="textPrimary"
        >
          404: La página que estas buscando no existe
        </Typography>
        <Typography
          align="center"
          variant="subtitle2"
          color="textSecondary"
        >
          Ingresaste alguna ruta incorrecta o
          vino aquí por error. Por favor, intente utilizar la navegación.
        </Typography>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
        >
          <img
            alt="Under development"
            className={classes.image}
            src="/static/images/undraw_page_not_found_su7k.svg"
          />
        </Box>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
        >
          <Button
            color="secondary"
            component={RouterLink}
            to="/"
            variant="outlined"
          >
            Volver a Inicio
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default NotFoundView;
