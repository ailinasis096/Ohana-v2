import {
  Avatar,
  Box, Button,
  Card,
  CardMedia,
  colors,
  Divider,
  Grid,
  IconButton,
  Link,
  makeStyles,
  SvgIcon,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import StitchIcon from '../assets/Stitch-heart.svg';
import StitchDislike from '../assets/Stitch-dislike.png';

import EditIcon from '@material-ui/icons/Edit';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/es'; // without this line it didn't work
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Share2 as ShareIcon } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import getInitials from 'src/utils/getInitials';
import api from '../api/Api';
import Swal from 'sweetalert2';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';
import { Image } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  image: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  likedButton: {
    color: colors.red[600]
  },
  donateButton: {
    color: colors.amber[600]

  },
  caption: {
    minHeight: '20px'
  },
  membersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  buttonsDiv: {
    display: 'contents'
  },
  nameBox: {
    display: 'grid'
  },
  dialogTitle: {
    '& h2': {
      display: 'flex',
      alignItems: 'center',
      '& h5': {
        padding: '0 2px'
      }
    }
  },
  secondDiv: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 1280px)': {
      width: '4rem',
    },
    '@media (min-width: 1281px)': {
      width: '8rem',
    },
  }
}));



moment.locale('es');

const CardEvents = ({ className, project, userMode, ...rest }) => {
  const classes = useStyles();
  const [isLiked, setLiked] = useState(true);
  const [openShare, setOpenShare] = useState(false);
  const [likesCount, setLikesCount] = useState(10);

  const handleLike = () => {
    setLiked(true);
    setLikesCount(prevLikes => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikesCount(prevLikes => prevLikes - 1);
  };

  const openShareDialog = () => {
    setOpenShare(true);
  };

  const closeShareDialog = () => {
    setOpenShare(false);
  };

  const handleEdit = () => {
  };
  useEffect(() => {
    api.getEvents();
  }, []);

  const deleteCampaign = () => {
    Swal.fire({
      title: `Está seguro que desea borrar su campaña ${project.name}?`,
      text: '¡Esta acción no tiene vuelta atrás!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteCampaign(project.id).then(response => {
          Swal.fire({
            title: 'Su campaña fue eliminada!',
            icon: 'success',
            timer: 2000
          }).then(resultConf => {
            if (resultConf.isConfirmed) {
              window.location.reload();
            }
          });
        }).catch(() => {
          Swal.fire(
            'Oops!',
            'Ha ocurrido un error, inténtelo de nuevo luego',
            'error'
          );
        });
      }
    });
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={3}>
        <CardMedia
          className={classes.image}
          image={project.image || 'https://www.argentina.gob.ar/sites/default/files/vinetas_justicia_cerca_04_quiero_donar_mis_organos.png'}
        />
        <Box display='flex' alignItems='center' mt={2}>
          <Avatar
            alt='Author'
            src='https://static1.abc.es/media/play/2020/09/29/avatar-kE4H--620x349@abc.jpeg'
          >
            {getInitials(project.contact.name)}
          </Avatar>
          <Box className={classes.nameBox} ml={2}>
            <Tooltip title={project.name}>
              <Typography noWrap variant='body2' color='textSecondary'>
                <Link
                  color='textPrimary'
                  component={RouterLink}
                  to={`/app/projects/overview/${project.id}`}
                  variant='h5'
                >
                  {project.name}
                </Link>
              </Typography></Tooltip>
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}
            >
              <Tooltip
                title={`Por ${project.contact.name} | Actualizado ${moment(
                  project.updated_at
                ).fromNow()}`}
              >
                <Typography noWrap variant='body2' color='textSecondary'>
                  Por{' '}
                  <Link
                    color='textPrimary'
                    component={RouterLink}
                    to='#'
                    variant='h6'
                  >
                    {project.contact.name}
                  </Link>{' '}
                  | Actualizado {moment(project.updated_at).fromNow()}
                </Typography>
              </Tooltip>
            </div>
          </Box>
        </Box>
      </Box>
      <Box
        pb={2}
        px={3}
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}
      >
        <Tooltip title={project.description.replace(/<\/?[^>]+(>|$)/g, '')}>
          <Typography noWrap color='textSecondary' variant='body2'>
            {project.description.replace(/<\/?[^>]+(>|$)/g, '')}
          </Typography>
        </Tooltip>
      </Box>
      <Box py={2} px={2} className={classes.description}>
        <Grid alignItems='center' container justify='space-between' spacing={3}>
          <Grid item>
            <Typography variant='h5' color='textPrimary'>
              {!!project.goal
                ? numeral(project.goal).format(`$0.00`)
                : numeral(project.donations_count).format(`$0.00`)}
            </Typography>
            <Typography noWrap variant='body2' color='textSecondary'>
              Objetivo
            </Typography>
          </Grid>
          <Grid item>
            <div
              className={classes.secondDiv}
            >
              <Tooltip title={project.location.street}>
                <Typography noWrap variant='h5' color='textPrimary'>
                  {project.location.street}
                </Typography>
              </Tooltip>
              <Typography variant='body2' color='textSecondary'>
                Ubicación
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <Typography noWrap variant='h5' color='textPrimary'>
              {project.event_type.id === 1 ? 'Monetaria' : 'Física'}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Tipo
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box py={2} pl={2} pr={2} display='flex' alignItems='center' bottom>
        {userMode ? (
          <div>
            <Tooltip title='Eliminar campaña'>
              <IconButton
                onClick={deleteCampaign}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Modificar campaña'>
              <IconButton
                component={RouterLink}
                to={`/app/projects/edit/${project.id}`}>
                <EditIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div className={classes.buttonsDiv}>
            {isLiked ? (
              <Tooltip title='Unlike'>
                <IconButton className={classes.likedButton} onClick={handleUnlike}>
                  <Avatar src={StitchIcon} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title='Like'>
                <IconButton onClick={handleLike}>
                  <Avatar src={StitchDislike} />
                </IconButton>
              </Tooltip>
            )}
            <Typography variant='subtitle2' color='textSecondary'>
              {likesCount}
            </Typography>
            <Tooltip title='Compartir'>
              <IconButton onClick={openShareDialog}>
                <SvgIcon
                  fontSize='small'
                  color='action'
                  className={classes.membersIcon}
                >
                  <ShareIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </div>)}
        <Box flexGrow={1} />
        <Tooltip title='Donar'>
          <Button className={classes.donateButton} href={`/app/donate/${project.id}`}>
            <FavoriteIcon />
            <Typography variant='subtitle1' color='textPrimary' style={{ marginLeft: '5px' }}>
              Dona!
            </Typography>
          </Button>
        </Tooltip>
      </Box>
      {!!openShare &&
      <Dialog onClose={closeShareDialog} open={openShare}>
        <DialogTitle className={classes.dialogTitle}>
          <Typography variant='h5'>Compartir </Typography>
          <Typography variant='h5' color='primary'>{project.name}</Typography>
        </DialogTitle>
        <Box py={2} px={5} display='flex' justifyContent='center' className={classes.shareBox}>
          <EmailShareButton
            subject={`${project.name}`}
            body={`${project.name} "\n" ${project.description}`}
            url={`http://www.ohana.com/donate/${project.id}`}
          >
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
          <FacebookShareButton
            url={`http://www.ohana.com/donate/${project.id}`}
            quote={`${project.name} \n ${project.description}`}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton
            title={`${project.name} \n ${project.description}`}
            url={`http://www.ohana.com/donate/${project.id}`}
          >
            <LinkedinIcon size={40} round={true} />
          </LinkedinShareButton>
          <TelegramShareButton
            title={`${project.name} \n ${project.description}`}
            url={`http://www.ohana.com/donate/${project.id}`}
          >
            <TelegramIcon size={40} round={true} />
          </TelegramShareButton>
          <TwitterShareButton
            title={`${project.name} \n ${project.description}`}
            url={`http://www.ohana.com/donate/${project.id}`}
            hashtags={[`${project.name.replace(/\s/g, '')}`, 'Doná']}
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            title={`${project.name} \n ${project.description}`}
            url={`http://www.ohana.com/donate/${project.id}`}
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
        </Box>
      </Dialog>
      }
    </Card>
  );
};

CardEvents.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default CardEvents;
