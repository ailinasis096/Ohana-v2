import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import api from './../../../api/Api';
import {
  Box,
  Button,
  FormHelperText,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  editorContainer: {
    marginTop: theme.spacing(3)
  },
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

const ProjectDescription = ({
                              eventId,
                              data,
                              className,
                              onBack,
                              onComplete,
                              editMode,
                              ...rest
                            }) => {
  const classes = useStyles();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(!!editMode ? data.image : '');

  const handleChange = () => ({ target: { value } }) => {
    setImage(value);
  };

  const arrangeData = () => {
    let form = {};
    if (editMode) {
      form = {
        attention_schedule: [
          {
            day: 1,
            from_time: '09:00:00',
            to_time: '13:00:00'
          },
          {
            day: 2,
            from_time: '09:00:00',
            to_time: '13:00:00'
          }
        ],
        name: data.name,
        category: data.category,
        init_date: data.startDate,
        end_date: data.endDate,
        description: data.description,
        event_type: data.event_type,
        image:
          image === ''
            ? 'https://www.argentina.gob.ar/sites/default/files/vinetas_justicia_cerca_04_quiero_donar_mis_organos.png'
            : image,
        goal: data.goal,
        contact: {
          id: eventId,
          name:  localStorage.getItem('username'),
          phone: '001-321-201-9918x5660',
          email: 'duiliocatalan@hotmail.com'
        },
        location: {
          id: eventId,
          street: data.location.street,
          address_line: 'Avenida Seve Carmona 128',
          postal_code: 5000
        }
      };
    } else {
      form = {
        attention_schedule: [
          {
            day: 1,
            from_time: '09:00:00',
            to_time: '13:00:00'
          },
          {
            day: 2,
            from_time: '09:00:00',
            to_time: '13:00:00'
          }
        ],
        name: data.name,
        category: data.category,
        init_date: data.startDate,
        end_date: data.endDate,
        description: data.description,
        event_type: data.event_type,
        goal: data.goal,
        image:
          image === ''
            ? 'https://www.argentina.gob.ar/sites/default/files/vinetas_justicia_cerca_04_quiero_donar_mis_organos.png'
            : image,
        contact: {
          name: localStorage.getItem('username'),
          phone: '001-321-201-9918x5660',
          email: 'duiliocatalan@hotmail.com'
        },
        location: {
          street: data.location.street,
          address_line: 'Avenida Seve Carmona 128',
          postal_code: 5000
        }
      };
    }
    sessionStorage.setItem('eventName', form.name);
    sessionStorage.setItem('eventImage', form.image);
    return form;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setSubmitting(true);
      let form = arrangeData();
      if (editMode) {
        await api.updateEvent(eventId, form);
      } else {
        await api.createEvent(form);
      }
      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  /*
    <Typography variant="h3" color="textPrimary">
      Agregar documentos
    </Typography>
    <Box mt={2}>
      <Typography variant="subtitle1" color="textSecondary">
        Seleccione los documentos que desea subir
      </Typography>
      <FilesDropzone setImage={setImage} />
    </Box>
  */

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Typography variant='h3' color='textPrimary'>
        Agregar imagen de la campaña
      </Typography>
      <Box mt={2}>
        <TextField
          fullWidth
          label='URL de la imagen'
          name='image'
          onChange={handleChange()}
          value={image}
          variant='outlined'
        />
      </Box>

      {error && (
        <Box mt={2}>
          <FormHelperText error>{FormHelperText}</FormHelperText>
        </Box>
      )}
      <Box mt={6} display='flex'>
        {onBack && (
          <Button onClick={onBack} size='large'>
            Atrás
          </Button>
        )}
        <Box flexGrow={1} />
        <Button
          color='secondary'
          disabled={isSubmitting}
          type='submit'
          variant='contained'
          size='large'
        >
          Listo
        </Button>
      </Box>
    </form>
  );
};

ProjectDescription.propTypes = {
  className: PropTypes.string,
  onComplete: PropTypes.func,
  onBack: PropTypes.func
};

ProjectDescription.defaultProps = {
  onComplete: () => {
  },
  onBack: () => {
  }
};

export default ProjectDescription;
