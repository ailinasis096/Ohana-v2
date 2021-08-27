import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import donar from '../../../assets/donar.png';
import family from '../../../assets/family.png';
import phone from '../../../assets/phone_ohana.jpeg';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 80,
    paddingBottom: 80,
    [theme.breakpoints.down('md')]: {
      paddingTop: 60,
      paddingBottom: 60
    }
  },
  technologyIcon: {
    height: 40,
    margin: theme.spacing(1)
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '90%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '90%',
      height: 'auto'
    }
  }
}));

const Hero = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              {/* <Typography variant="overline" color="secondary">
                Introducing
              </Typography> */}
              <Typography variant="h1" color="textPrimary">
                ¡Nosotros somos Ohana!
              </Typography>
              <Box mt={3}>
                <Typography variant="body1" color="textSecondary">
                  Red social solidaria para fomentar la participación ciudadana
                  en distintas campañas y ayudar a más personas.
                </Typography>
              </Box>
              {/* <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      30+
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Demo Pages
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      UX
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Complete Flows
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      300+
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Components
                    </Typography>
                  </Grid>
                </Grid>
              </Box> */}
              <Box mt={3}>
                <img
                  alt="Javascript"
                  className={classes.technologyIcon}
                  src={donar}
                />
                <img
                  alt="Typescript"
                  className={classes.technologyIcon}
                  src={family}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box position="relative">
              <div className={classes.shape}>
                {/* <img alt="Shapes" src="/static/home/shapes.svg" /> */}
              </div>
              {/* <div className={classes.image}> */}
              <div>
                {/* <img alt="Presentation" src="/static/home/dark-light.png" /> */}
                <img alt="Presentation" src={phone} />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;
