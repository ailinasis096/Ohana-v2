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
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState();
  const [event, setEvent] = useState();
  
  useEffect(() => {
    if(!!match.params.id) {
      getEvent();
      setEditMode(true);
    }
    
  }, []);

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
                    <UserDetails setData={setData} event={event} onNext={handleNext}/>
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
                    {editMode ? 'Campaña actualizada!' : 'Campaña creada!'}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="center"
                  >
                    {editMode ? 'Tu campaña fue modificada exitosamente.' : 'Tu campaña fue creada exitosamente.'}
                    <br/><br/>
                    Dirijase a 
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
                    to="/app/reports/dashboard"
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
