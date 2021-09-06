import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { Pagination, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CardEvents from 'src/components/CardEvents';

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  sortButton: {
    textTransform: 'none',
    letterSpacing: 0,
    marginRight: theme.spacing(2)
  },
  divNoResults: {
    textAlign: 'center',
    margin: '55px 20px'
  },
  imgNoResults: {
    width: '50%',
    paddingTop: '20px'
  }
}));

const Results = ({ className, projects, fetchEvent, ...rest }) => {
  const classes = useStyles();
  const [mode, setMode] = useState('grid');
  const [pageSize, setPageSize] = useState();
  const [page, setPage] = useState(1);

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchEvent(page, 15, '');
  }, [page]);

  const getPageSize = () => {
    let pageSize = 1;
    if (!!projects.results) {
      pageSize = Math.ceil(projects.count / 15);
    }
    return pageSize;
  };

  return (
    !!projects.results && projects.results.length === 0 ? (
      <div className={classes.divNoResults}>
        <Typography
        variant="h4"
        color="textPrimary"
      >
        No se encontraron resultados
      </Typography>
      
            <img
              alt="No se encontraron resultados"
              className={classes.imgNoResults}
              src="/static/images/drawkit-grape-pack-illustration-15.svg"
            />
        </div>
    ) : 
    (!!projects.results && (
      <div className={clsx(classes.root, className)} {...rest}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={2}
        >
          <Typography
            className={classes.title}
            variant="h5"
            color="textPrimary"
          >
            Campañas
          </Typography>
          <Box display="flex" alignItems="center">
            <ToggleButtonGroup
              exclusive
              onChange={handleModeChange}
              size="small"
              value={mode}
            >
              <ToggleButton value="grid">
                <ViewModuleIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Grid container spacing={3}>
          {projects.results.map(project => (
            <Grid
              item
              key={project.id}
              md={mode === 'grid' ? 4 : 12}
              sm={mode === 'grid' ? 6 : 12}
              xs={12}
            >
              <CardEvents project={project} userMode={false} />
            </Grid>
          ))}
        </Grid>
        <Box mt={6} display="flex" justifyContent="center">
          <Pagination count={getPageSize()} onChange={handleChange} />
        </Box>
      </div>
    ))
  );
};

Results.propTypes = {
  className: PropTypes.string,
  projects: PropTypes.array.isRequired
};

export default Results;
