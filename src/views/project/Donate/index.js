import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Container,
  Avatar,
  Card,
  CardContent,
  Typography,
  colors,
  makeStyles,
  withStyles,
  CardMedia,
  Button
} from '@material-ui/core';
import {
  CheckCircle as CheckCircleIcon
} from 'react-feather';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Page from 'src/components/Page';
import API from './../../../api/Api';
import DonateAction from './DonateAction';
import celebrate from '../../../assets/celebration.png';

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
          <div>
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Box
                    display='flex'
                    justifyContent='center'
                  >
                    <Avatar className={classes.avatar}>
                      <CheckCircleIcon />
                    </Avatar>
                  </Box>
                  <Typography component='h3' variant='h3'>
                    ¡Gracias Elías por ayudar!
                  </Typography>
                  <Typography component='h4' variant='h4'>
                    Tu donación se ha completado con éxito
                  </Typography>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={celebrate}
                title='Tu donación se ha completado con éxito'
              />
            </Card>
            <Card>
              <CardContent className={classes.content2}>
                <Box
                  maxWidth={450}
                  mx='auto'
                >
                  <Box
                    mt={2}
                    display='flex'
                    justifyContent='center'
                    className={classes.buttonDiv}
                  >
                    <Typography
                      variant='h5'
                      color='textSecondary'
                      align='center'
                    >
                      Hay cientos de personas para ayudar
                    </Typography>
                    <Button
                      className={classes.button}
                      variant='contained'
                      color='secondary'
                      component={RouterLink}
                      to='/app/events/browse'
                    >
                      Ver campañas
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default Donate;
