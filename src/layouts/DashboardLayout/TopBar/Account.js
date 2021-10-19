import React, { useRef, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  makeStyles,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import avatar from '../../../assets/avatar.png'

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

const Account = () => {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef(null);
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);

  const user = {
    name:  localStorage.getItem('username'),
    avatar: avatar
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      localStorage.removeItem('token');
      history.push('/');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Avatar alt='User' className={classes.avatar} src={user.avatar} />
        <Hidden smDown>
          <Typography variant='h6' color='primary'>
            {user.name}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem component={RouterLink} to='/app/social/profile'>
          Perfil
        </MenuItem>
        <MenuItem component={RouterLink} to='/app/account'>
          Mi cuenta
        </MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export default Account;
