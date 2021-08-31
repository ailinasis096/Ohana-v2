import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128
  },
  browseButton: {
    marginLeft: theme.spacing(2)
  }
}));

const CTA = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Typography variant="h1" align="center" color="textPrimary">
          ¿Querés donar?
        </Typography>
        <Typography variant="h1" align="center" color="secondary">
          Lo podes hacer desde acá
        </Typography>
        <Box mt={2} display="flex" justifyContent="center" alignItems="center">
          <Button
            color="secondary"
            component="a"
            href="/login"
            variant="contained"
          >
            Donar!
          </Button>
        </Box>
      </Container>
    </div>
  );
};

CTA.propTypes = {
  className: PropTypes.string
};

export default CTA;
