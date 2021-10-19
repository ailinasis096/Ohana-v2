import React, { useState, useEffect } from 'react';
import {
  Box,
  Breadcrumbs,
  Container,
  Typography,
  colors,
  makeStyles,
  withStyles,
  LinearProgress
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Page from 'src/components/Page';
import API from './../../../api/Api';
import DonateAction from './DonateAction';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  avatar: {
    backgroundColor: '#5465D1'
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  buttonDiv: {
    display: 'grid',
    marginTop: '30px'
  },
  button: {
    marginTop: '25px',
    marginBottom: '25px'
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    marginLeft: '145px'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'center',
    '& > *': {
      marginTop: '3%'
    }
  },
  content2: {
    padding: '30px'
  },
  cover: {
    width: '40%',
    height: '270px'
  }
}));


const Donate = ({ match, history }) => {
  const classes = useStyles();
  const [event, setEvent] = useState();
  const [completed, setCompleted] = useState(false);
  const form = {
    amount: 0,
    event: 0,
    donation_name: ''
  };
  /*const form = {};*/

  useEffect(() => {
    getEvent();
  }, []);

  const handleBack = () => {
    history.replace(`/app/projects/${event.id}`);
  };

  console.log('holaaaa')

  const createDonation = async () => {
    try {
      const event = await API.createDonation(form);
      setEvent(event);
    } catch (err) {
      console.error(err);
    }
  };

  const getEvent = async () => {
    try {
      const event = await API.getEventById(match.params.id);
      sessionStorage.setItem('donatedEvent', event.name )
      setEvent(event);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = (selectedAmount) => {
    form.amount = parseFloat(selectedAmount);
    form.event = event.id;
    form.donation_name = '#' + event.name.replace(/ /g, '');

    createDonation(JSON.stringify(form));
    setCompleted(true);
  };

  return (!!event &&
    <Page
      className={classes.root}
      title='Donar'
    >
      <Container maxWidth='lg'>
        <Box mb={3}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            aria-label='breadcrumb'
          >
            <Typography
              variant='body1'
              color='textPrimary'
            >
              Donar
            </Typography>
            <Typography
              variant='body1'
              color='textPrimary'
            >
              Mercado Pago
            </Typography>
          </Breadcrumbs>
          <Typography
            variant='h3'
            color='textPrimary'
          >
            {event.name}
          </Typography>
        </Box>
        {!completed ? (
          <DonateAction onBack={handleBack} onComplete={handleComplete} />
        ) : (
          <LinearProgress color="primary" />
        )}
      </Container>
    </Page>
  );
};

export default Donate;
