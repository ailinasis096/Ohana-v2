import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  Typography,
  InputBase,
  makeStyles
} from '@material-ui/core';
import { Share2 as ShareIcon, Bell as BellIcon, Heart as HeartIcon, } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  label: {
    marginLeft: theme.spacing(1)
  },
}));

const Statistics = ({event, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          alignItems="center"
          md={4}
          sm={6}
          xs={12}
        >
          <Grid
            item
            container spacing={1} justify="flex-end"
          >
            <Grid item>
              <HeartIcon color='#5465D1'/>
            </Grid>
            <Grid item>
              <InputBase id="input-with-icon-grid" value='50' label="With a grid" />
            </Grid>
          </Grid>
          <Typography
            variant="overline"
            color="textPrimary"
          >
            Donaciones
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={4}
          sm={6}
          xs={12}
        >
          <Grid
            item
            container spacing={1} justify="flex-end"
          >
            <Grid item>
              <ShareIcon  color='#5465D1'/>
            </Grid>
            <Grid item>
              <InputBase id="input-with-icon-grid" value='7.7K' label="With a grid" />
            </Grid>
          </Grid>
          <Typography
            variant="overline"
            color="textSecondary"
          >
            Veces compartido
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={4}
          sm={6}
          xs={12}
        >
          <Grid
            item
            container spacing={1} justify="flex-end"
          >
            <Grid item>
              <BellIcon color='#5465D1'/>
            </Grid>
            <Grid item>
              <InputBase id="input-with-icon-grid" value='150' label="With a grid" />
            </Grid>
          </Grid>
          <Typography
            variant="overline"
            color="textSecondary"
          >
            Suscriptos
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

Statistics.propTypes = {
  className: PropTypes.string
};

export default Statistics;
