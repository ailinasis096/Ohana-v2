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
import AccountData from './AccountData';
import StepByStep from './StepByStep';
import mp from '../../../assets/mp.png'

const steps = [
  {
    label: 'Paso a paso',
    icon: UserIcon
  },
  {
    label: 'Datos',
    icon: BriefcaseIcon
  },
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
    backgroundColor: '#5465D1'
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  buttonDiv: {
    display: 'grid',
    marginTop: '30px',
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
    padding: '30px',
  },
  cover: {
    width: '40%',
    height: '270px'
  },
}));

const AccountMP = ({ match }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  
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
      title='Configurar cuenta'
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
              Configurar cuenta
            </Typography>
          </Breadcrumbs>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            Configurar cuenta
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
                    <StepByStep onBack={handleBack} onNext={handleNext}/>
                  )}
                  {activeStep === 1 && (
                    <AccountData
                      onBack={handleBack}
                      onComplete={handleComplete}             
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
                    display="flex"
                    justifyContent="center"
                  >
                  <Avatar className={classes.avatar}>
                    <CheckCircleIcon />
                  </Avatar>
                </Box>
                <Typography component="h4" variant="h4">
                  Tu campaña se ha vinculado a Mercado Pago con éxito
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              className={classes.cover}
              image={mp}
              title="Live from space album cover"
            />
          </Card>
          <Card>
            <CardContent className={classes.content2}>
              <Box
                maxWidth={450}
                mx="auto"
              >
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="center"
                  className={classes.buttonDiv}
                >
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    align="center"
                  >
                    Listo! Tu campaña ya se encuentra activa
                  </Typography>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    component={RouterLink}
                    to="/app/reports/dashboard"
                  >
                    Ver camapaña
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card></div>
        )}
      </Container>
    </Page>
  );
};

export default AccountMP;
