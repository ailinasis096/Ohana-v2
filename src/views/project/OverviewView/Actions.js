import React, { useState } from 'react';
import clsx from 'clsx';
import {
Container,
  Grid,
  Box,
  Card,
  Button,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import shareSVG from '../../../assets/share-2.svg'
import bellSVG from '../../../assets/bell.svg'
import mpImg from '../../../assets/mp2.png'
import { Link as RouterLink } from 'react-router-dom';
import ShareDialog from './../../../components/ShareDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  card: {
    padding: theme.spacing(3),
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: '100%'
  },
  button2: {
    marginTop: 10,
    width: '100%'
  },
}));

const Actions = ({event, className, ...rest }) => {
  const classes = useStyles();
  const [openShare, setOpenShare] = useState(false);

  const openShareDialog = () => {
    setOpenShare(true);
  };

  const closeShareDialog = () => {
    setOpenShare(false);
  };

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Card
                className={clsx(classes.card, className)}
                {...rest}
                >
                <Box flexGrow={1} className={classes.item}>
                  <img
                    alt="Share"
                    className={classes.image}
                    src={shareSVG}
                  />
                </Box>
                <Box flexGrow={1}>
                    <Button
                      className={classes.button}
                      color="secondary"
                      variant="contained"
                      onClick={openShareDialog}
                      >
                      Compartir
                    </Button>
                </Box>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Card
                className={clsx(classes.card, className)}
                {...rest}
                >
                <Box flexGrow={1} className={classes.item}>
                  <img
                    alt="Donate"
                    className={classes.image}
                    src={mpImg}
                  />
                </Box>
                <Box flexGrow={1}>
                    <Button
                        className={classes.button2}
                        color="secondary"
                        variant="contained"
                        component={RouterLink}
                        to={`/app/donate/${event.id}`}
                        >
                        Donar
                    </Button>
                </Box>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Card
                className={clsx(classes.card, className)}
                {...rest}
                >
                <Box flexGrow={1} className={classes.item}>
                  <img
                      alt="Subscribe"
                      className={classes.image}
                      src={bellSVG}
                    />
                </Box>
                <Box flexGrow={1}>
                    <Button
                        className={classes.button}
                        color="secondary"
                        variant="contained"
                        >
                        Suscribirse
                    </Button>
                </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {!!openShare && 
        <ShareDialog project={event} openShare={openShare} closeDialog={closeShareDialog} />
      }
    </Page>
  );
};

export default Actions;
