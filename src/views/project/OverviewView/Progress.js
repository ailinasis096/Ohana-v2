import React, {
    useState,
    useEffect
  } from 'react';
  import PropTypes from 'prop-types';
  import clsx from 'clsx';
  import {
    Box,
    Card,
    Typography,
    LinearProgress,
    makeStyles
  } from '@material-ui/core';

  const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        paddingLeft: 50,
        paddingRight: 50,
      },
      progress: {
        margin: theme.spacing(0, 1),
        flexGrow: 1,
      }
  }));
  
  const Progress = (event, { className, ...rest }) => {
    const classes = useStyles();
    const [progress, setProgress] = useState();
  
    useEffect(() => {
      if(!!event.event) {
        const recaudado = event.event.budget - 150;
        setProgress(recaudado*100/event.event.budget);
      }
    }, [event.event])
    
    return (
        <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          Progreso
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {progress}
            %
          </Typography>
          <LinearProgress
            className={classes.progress}
            value={progress}
            color="secondary"
            variant="determinate"
          />
        </Box>
      </Card>
    );
  };
  
  Progress.propTypes = {
    className: PropTypes.string
  };
  
  export default Progress;
  