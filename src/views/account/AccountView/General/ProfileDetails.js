import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import avatar from '../../../../assets/avatar.png';

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    marginTop: theme.spacing(2)
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const ProfileDetails = ({ className, user, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Avatar className={classes.avatar} src={avatar} />
          <Typography
            className={classes.name}
            gutterBottom
            variant="h3"
          >
           {user.additional_info.first_name + ' ' + user.additional_info.last_name}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            {'@'+user.username}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="text" color={'primary'}>
          Eliminar imagen
        </Button>
      </CardActions>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default ProfileDetails;
