import React, { useState, useEffect} from 'react';
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
  withStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  User as UserIcon,
  Star as StarIcon,
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
    padding: 0,
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
      <Icon size="20" />
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
    backgroundColor: colors.red[600]
  },
  stepper: {
    backgroundColor: 'transparent'
  }
}));

const ProjectCreateView  = ({ match }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [data, setData] = useState();
  const [event, setEvent] = useState();
  
  useEffect(() => {
    if(!!match.params.id) {
      getEvent();
      /*setEvent(
        {
          id: 1,
          title: 'Homelessfonts',
          isLiked: true,
          likesCount: 60,
          updatedAt: [2021, 5, 6],
          image:
            'https://pbs.twimg.com/profile_banners/2462036270/1500387392/1080x360',
          caption:
            'Homelessfonts es un iniciativa de la Fundación Arrels que consiste en crear tipografías a partir de la caligrafía de personas que viven en las calles de Barcelona. La idea es que los usuarios y marcas utilicen estas tipografías. Todos los beneficios obtenidos van destinados a ayudar las 1400 personas que la Fundación Arrels atiende.',
          budget: 200,
          currency: '$',
          location: 'Córdoba',
          type: 'Monetaria',
          rating: 5,
          category: 'Animales',
          author: {
            avatar:
              'data:image/jpeg;base64,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',
            name: 'Lady Gaga'
          }
        },
      )*/
    }
    
  }, []);

  const getEvent = async () => {
    try {
      const event = await api.getEventById(match.params.id);
      console.log('event: ', event)
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

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <Page
      className={classes.root}
      title={!!event ? 'Modificar campaña' : 'Crear campaña'}
    >
      <Container maxWidth="lg">
        <Box mb={3}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              variant="body1"
              color="inherit"
              to="/app"
              component={RouterLink}
            >
              Dashboard
            </Link>
            <Typography
              variant="body1"
              color="textPrimary"
            >
              {!!event ? 'Editar' : 'Crear'}
            </Typography>
          </Breadcrumbs>
          <Typography
            variant="h3"
            color="textPrimary"
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
                  orientation="vertical"
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
                    />
                  )}
                  {activeStep === 2 && (
                    <ProjectDescription
                      event={event}
                      onBack={handleBack}
                      onComplete={handleComplete}
                      data={data}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Card>
            <CardContent>
              <Box
                maxWidth={450}
                mx="auto"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                >
                  <Avatar className={classes.avatar}>
                    <StarIcon />
                  </Avatar>
                </Box>
                <Box mt={2}>
                  <Typography
                    variant="h3"
                    color="textPrimary"
                    align="center"
                  >
                    Campaña creada!
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="center"
                  >
                    Tu campaña fue creada exitosamente.
                  </Typography>
                </Box>
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    component={RouterLink}
                    to="/app/projects/1"
                  >
                    Mis campañas
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Page>
  );
};

export default ProjectCreateView;
