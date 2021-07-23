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
  root: {},
  action: {
    backgroundColor: theme.palette.common.white
  },
  image: {
    width: '100%',
    maxHeight: 400
  },
  grid: {
    marginTop: 5,
  }
}));

const Header = (event, {className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      {!!event.event && (
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
          <Typography
            variant="overline"
            color="textSecondary"
          >
            {event.event.category}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {event.event.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textPrimary"
          >
            {event.event.caption}
          </Typography>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={3}
            className={classes.grid}
          >
            <Grid item>
              <Rating
                value={event.event.rating}
                size="small"
                readOnly
              />
              
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                color="textPrimary"
              >
                {event.event.location}
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
                {event.event.type}
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
          >
            <img
              alt="Cover"
              className={classes.image}
              src={event.event.image}
            />
          </Grid>
        </Hidden>
      </Grid>
      )}
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
