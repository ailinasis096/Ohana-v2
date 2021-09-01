import {
  Avatar,
  Box,
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
  Typography
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/es'; // without this line it didn't work
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Share2 as ShareIcon } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'grid'
  },
  image: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  likedButton: {
    color: colors.red[600]
  },
  caption: {
    minHeight: '20px'
    /*display: 'box',
    lineClamp: 7,
    boxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 5*/
  },
  membersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}));

moment.locale('es');

const CardEvents = ({ className, project, ...rest }) => {
  const classes = useStyles();
  const [isLiked, setLiked] = useState(true);
  const [likesCount, setLikesCount] = useState(10);

  const handleLike = () => {
    setLiked(true);
    setLikesCount(prevLikes => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikesCount(prevLikes => prevLikes - 1);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={3}>
        <CardMedia
          className={classes.image}
          image="https://www.argentina.gob.ar/sites/default/files/vinetas_justicia_cerca_04_quiero_donar_mis_organos.png"
        />
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar
            alt="Author"
            src="https://static1.abc.es/media/play/2020/09/29/avatar-kE4H--620x349@abc.jpeg"
          >
            {getInitials(project.contact.name)}
          </Avatar>
          <Box ml={2}>
            <Link
              color="textPrimary"
              component={RouterLink}
              to={`/app/projects/overview/${project.id}`}
              variant="h5"
            >
              {project.name}
            </Link>
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '18rem'
              }}
            >
              <Tooltip
                title={`Por ${project.contact.name} | Actualizado ${moment(
                  project.updated_at
                ).fromNow()}`}
              >
                <Typography noWrap variant="body2" color="textSecondary">
                  Por{' '}
                  <Link
                    color="textPrimary"
                    component={RouterLink}
                    to="#"
                    variant="h6"
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
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '24rem' }}
      >
        <Tooltip title={project.description}>
          <Typography noWrap color="textSecondary" variant="body2">
            {project.description}
          </Typography>
        </Tooltip>
      </Box>
      <Box py={2} px={3} className={classes.description}>
        <Grid alignItems="center" container justify="space-between" spacing={3}>
          <Grid item>
            <Typography variant="h5" color="textPrimary">
              {!!project.goal
                ? numeral(project.goal).format(`$0,0.000`)
                : numeral(project.donations_count).format(`0,0.000`)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Objetivo
            </Typography>
          </Grid>
          <Grid item>
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '5rem'
              }}
            >
              <Tooltip title={project.location.street}>
                <Typography noWrap variant="h5" color="textPrimary">
                  {project.location.street}
                </Typography>
              </Tooltip>
              <Typography variant="body2" color="textSecondary">
                Ubicación
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <Typography variant="h5" color="textPrimary">
              {project.event_type.id === 1 ? 'Monetaria' : 'Física'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Tipo
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box py={2} pl={2} pr={2} display="flex" alignItems="center" bottom>
        {isLiked ? (
          <Tooltip title="Unlike">
            <IconButton className={classes.likedButton} onClick={handleUnlike}>
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Like">
            <IconButton onClick={handleLike}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Typography variant="subtitle2" color="textSecondary">
          {likesCount}
        </Typography>
        <SvgIcon
          fontSize="small"
          color="action"
          className={classes.membersIcon}
        >
          <ShareIcon />
        </SvgIcon>
        <Box flexGrow={1} />
        <Rating value="4" size="small" readOnly />
      </Box>
    </Card>
  );
};

CardEvents.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default CardEvents;
