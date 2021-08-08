import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';

import FilesDropzone from 'src/components/FilesDropzone';

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

const ProjectDescription = ({ className, onBack, onComplete, ...rest }) => {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = value => {
    setContent(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setSubmitting(true);

      // NOTE: Make API request

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

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Typography variant="h3" color="textPrimary">
        Agregar documentos
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary">
          Seleccione los documentos que desea subir
        </Typography>
        <FilesDropzone />
      </Box>

      {error && (
        <Box mt={2}>
          <FormHelperText error>{FormHelperText}</FormHelperText>
        </Box>
      )}
      <Box mt={6} display="flex">
        {onBack && (
          <Button onClick={onBack} size="large">
            Atrás
          </Button>
        )}
        <Box flexGrow={1} />
        <Button
          color="secondary"
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          size="large"
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
  onComplete: () => {},
  onBack: () => {}
};

export default ProjectDescription;