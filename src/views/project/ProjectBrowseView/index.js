import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import api from '../../../api/Api';
import Filter from './Filter';
import Header from './Header';
import Results from './Results';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const ProjectBrowseView = () => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await api.getEvents();
      setEvents(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const fetchEvent = async (pageSize = 1, results = 15, data) => {
    let response;
    try {
      response = await api.getEvents(pageSize, results, data);
      setEvents(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Page className={classes.root} title="Explorar campañas | Ohana">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter fetchEvent={fetchEvent}/>
        </Box>
        <Box mt={4}>
          <Results projects={events} fetchEvent={fetchEvent}/>
        </Box>
      </Container>
    </Page>
  );
};

export default ProjectBrowseView;
