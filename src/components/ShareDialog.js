import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Box,
    makeStyles,
    Typography,
    Dialog,
    DialogTitle
} from '@material-ui/core';
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

const useStyles = makeStyles(() => ({
  root: {},
  dialogTitle: {
    '& h2': {
      display: 'flex',
      alignItems: 'center',
      '& h5': {
        padding: '0 2px'
      }
    }
  },
}));

const ShareDialog = ({project, openShare, closeDialog}) => {
  const classes = useStyles();

  console.log('project: ', project);
  
  return (
    <Dialog onClose={closeDialog} open={openShare}>
        <DialogTitle className={classes.dialogTitle}>
            <Typography variant='h5'>Compartir </Typography>
            <Typography variant='h5' color='primary'>{project.name}</Typography>
        </DialogTitle>
        <Box py={2} px={5} display='flex' justifyContent='center'>
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
  );
}

ShareDialog.propTypes = {
  className: PropTypes.string
};

export default ShareDialog;
