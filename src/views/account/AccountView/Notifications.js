import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import wait from 'src/utils/wait';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();

  const handleSubmit = async event => {
    event.preventDefault();
    // NOTE: Make API request
    await wait(500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Notificaciones" />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6" color="textPrimary">
                Sistema
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                Recibirás mensajes en tu correo personal
              </Typography>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Alertas en Correo"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Push Notifications"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Mensajes de Texto"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={
                    <>
                      <Typography variant="body1" color="textPrimary">
                        Llamadas telefónicas
                      </Typography>
                      <Typography variant="caption">
                        Cortos mensajes de voz informando cambios
                      </Typography>
                    </>
                  }
                />
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6" color="textPrimary">
                Chat App
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                You will recieve emails in your business email address
              </Typography>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Push notifications"
                />
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box p={2} display="flex" justifyContent="flex-end">
          <Button color="secondary" type="submit" variant="contained">
            Save Settings
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
