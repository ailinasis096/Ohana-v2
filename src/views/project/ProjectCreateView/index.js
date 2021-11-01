import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import api from '../../../api/Api';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  colors,
  makeStyles,
  withStyles,
  CardMedia
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  User as UserIcon,
  CheckCircle as CheckCircleIcon,
  Briefcase as BriefcaseIcon,
  File as FileIcon
} from 'react-feather';
import Page from 'src/components/Page';
import UserDetails from './UserDetails';
import ProjectDetails from './ProjectDetails';
import ProjectDescription from './ProjectDescription';

const steps = [
  {
    label: 'Información',
    icon: UserIcon
  },
  {
    label: 'Objetivo',
    icon: BriefcaseIcon
  },
  {
    label: 'Documentos',
    icon: BriefcaseIcon
  }
];

const CustomStepConnector = withStyles((theme) => ({
  vertical: {
    marginLeft: 19,
    padding: 0
  },
  line: {
    borderColor: theme.palette.divider
  }
}))(StepConnector);

const useCustomStepIconStyles = makeStyles((theme) => ({
  root: {},
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[10],
    color: theme.palette.secondary.contrastText
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

const CustomStepIcon = ({ active, completed, icon }) => {
  const classes = useCustomStepIconStyles();

  const Icon = steps[icon - 1].icon;


  return (
    <Avatar
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      <Icon size='20' />
    </Avatar>
  );
};

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number.isRequired
};

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
    display: 'grid'
  },
  button: {
    marginTop: '15px',
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

const ProjectCreateView = ({ match }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState();
  const [event, setEvent] = useState();
  let [accountMp, setAccountMp] = useState('');

  useEffect(() => {
    if (!!match.params.id) {
      getEvent();
      setEditMode(true);
    }

  }, [match]);

  const getEvent = async () => {
    try {
      const event = await api.getEventById(match.params.id);
      setEvent(event);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    api.getMpAccount()
      .then(response => {
        setAccountMp(response);
      });

  }, []);

  const handleComplete = () => {
    setCompleted(true);

  };

  let sessionName = sessionStorage.getItem('eventName');
  let sessionImage = sessionStorage.getItem('eventImage');

  return (
    <Page
      className={classes.root}
      title={!!event ? 'Modificar campaña' : 'Crear campaña'}
    >
      <Container maxWidth='lg'>
        <Box mb={3}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            aria-label='breadcrumb'
          >
            <Link
              variant='body1'
              color='inherit'
              to='/app'
              component={RouterLink}
            >
              Dashboard
            </Link>
            <Typography
              variant='body1'
              color='textPrimary'
            >
              {!!event ? 'Editar' : 'Crear'}
            </Typography>
          </Breadcrumbs>
          <Typography
            variant='h3'
            color='textPrimary'
          >
            {!!event ? 'Modificá tu campaña' : 'Creá tus campañas'}
          </Typography>
        </Box>
        {!completed ? (
          <Paper>
            <Grid container>
              <Grid
                item
                xs={12}
                md={3}
              >
                <Stepper
                  activeStep={activeStep}
                  className={classes.stepper}
                  connector={<CustomStepConnector />}
                  orientation='vertical'
                >
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel StepIconComponent={CustomStepIcon}>
                        {step.label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid
                item
                xs={12}
                md={9}
              >
                <Box p={3}>
                  {activeStep === 0 && (
                    <UserDetails setData={setData} event={event} onNext={handleNext} />
                  )}
                  {activeStep === 1 && (
                    <ProjectDetails
                      event={event}
                      onBack={handleBack}
                      onNext={handleNext}
                      setData={setData}
                      data={data}
                      editMode={editMode}
                    />
                  )}
                  {activeStep === 2 && (
                    <ProjectDescription
                      eventId={!!event ? event.id : ''}
                      onBack={handleBack}
                      onComplete={handleComplete}
                      data={data}
                      editMode={editMode}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
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
                  <Typography component='h4' variant='h4'>
                    {editMode ? '¡Campaña actualizada!' : '¡Campaña creada!'}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {editMode ? `Tu campaña ${event.name} fue modificada exitosamente.` : `Tu campaña ${sessionName} fue creada exitosamente.`}
                  </Typography>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={!!event ? event.image : sessionImage}
                title='Live from space album cover'
              />
            </Card>
            {
              (accountMp.name === '') ?
                <Card>

                  <CardContent className={classes.content2}
                  >
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
                          variant='subtitle1'
                          color='textSecondary'
                          align='center'
                        >
                          Sólo queda configurar tu cuenta de mercado pago
                        </Typography>
                        <Button
                          className={classes.button}
                          variant='contained'
                          color='secondary'
                          component={RouterLink}
                          to='/app/config-account'
                        >
                          Configurar cuenta
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card> : null
            }
          </div>
        )}
      </Container>
    </Page>
  );
};

export default ProjectCreateView;
