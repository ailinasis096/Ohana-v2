import React, {
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import numeral from 'numeral';
import {
  Card,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

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
  overline: {
    marginTop: theme.spacing(1),
    color: '#5465D1'
  },
  recaudado: {
    marginTop: theme.spacing(1),
    color: '#4CAF50'
  },
  falta: {
    marginTop: theme.spacing(1),
    color: '#E7706A'
  },
}));

const Statistics = ({event, className, ...rest }) => {
  const classes = useStyles();
  const [recaudado, setRecaudado] = useState(1000);
  const [falta, setFalta] = useState(500);

  useEffect(() => {
    setRecaudado(event.budget - 150);
    setFalta(event.budget - recaudado);
  }, [event.event])

  useEffect(() => {
    setFalta(event.budget - recaudado);
  }, [recaudado])


  useEffect(() => {
    event.budget=5000;
  }, [])
  
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
          md={4}
          sm={6}
          xs={12}
        >
          <Typography
            variant="h2"
            color="textPrimary"
          >
            {numeral(recaudado).format('$0,0.000')}
          </Typography>
          <Typography
            className={classes.recaudado}
            variant="overline"
            color="primary"
          >
            Recaudado
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={4}
          sm={6}
          xs={12}
        >
          <Typography
            variant="h2"
            color="textPrimary"
          >
            {numeral(event.goal).format('$0,0.000')}
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
            color="textSecondary"
          >
            Objetivo
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={4}
          sm={6}
          xs={12}
        >
          <Typography
            variant="h2"
            color="textPrimary"
          >
            {numeral(falta).format('$0,0.000')}
          </Typography>
          <Typography
            className={classes.falta}
            variant="overline"
            color="textSecondary"
          >
            Faltan
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
