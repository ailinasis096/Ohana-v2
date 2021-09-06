import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  Hidden,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0'
  },
  action: {
    backgroundColor: theme.palette.common.white
  },
  image: {
    width: '400px',
    height: 'auto'
  },
  grid: {
    marginTop: 5,
  },
  divImage: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const Header = ({event, className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <div className={classes.firstDiv}>
          <Typography
            variant="overline"
            color="textSecondary"
          >
            {event.category.name || 'Personas'}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {event.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textPrimary"
          >
            {event.description.replace(/<\/?[^>]+(>|$)/g, "")}
          </Typography></div>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={3}
            className={classes.grid}
          >
            <Grid item>
              <Rating
                value="4"
                size="small"
                readOnly
              />
              
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                color="textPrimary"
              >
                {event.location.street}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Ubicación
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                color="textPrimary"
              >
                {event.event_type.name === 'Monetary' ? 'Monetaria' : 'Física'}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Tipo
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid
            item
            md={6}
            className={classes.divImage}
          >
            <img
              alt="Cover"
              className={classes.image}
              src={event.image}
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
