import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import api from '../../../api/Api';
import Filter from './Filter';
import Header from './Header';
import Results from './Results';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  progress: {
    marginTop: '20vh',
    marginLeft: '32vw'
  }
}));

const ProjectBrowseView = () => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEvents = async () => {
    setLoading(true);
    try {
      const response = await api.getEvents();
      setEvents(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const fetchEvent = async (pageSize = 1, results = 15, data, state) => {
    let response;
    try {
      response = await api.getEvents(pageSize, results, data, state);
      setEvents(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Page className={classes.root} title='Explorar campañas | Ohana'>
      <Container maxWidth='lg'>
        <Header />
        <Box mt={3}>
          <Filter fetchEvent={fetchEvent} />
        </Box>
        {!!loading ? (
          <CircularProgress className={classes.progress} color='primary' size={50} />
        ) : (
          <Box mt={4}>
            <Results projects={events} fetchEvent={fetchEvent} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default ProjectBrowseView;
