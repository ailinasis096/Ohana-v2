import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Chip,
  FormHelperText,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { DatePicker } from '@material-ui/pickers';
import { Plus as PlusIcon } from 'react-feather';
import dateFnsFormat from 'date-fns/format';

const useStyles = makeStyles(theme => ({
  root: {},
  addTab: {
    marginLeft: theme.spacing(2)
  },
  tag: {
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  datePicker: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const ProjectDetails = ({ data, setData, event, className, onBack, onNext, editMode, ...rest }) => {
  const classes = useStyles();
  const [tag, setTag] = useState('');
  const [objetives, setObjetives] = useState([]);
  const [showTextObjetives, setShowTextObjetives] = useState([]);
  const [formValues, setFormValues] = useState(null);
  const objetiveOption = ['Monetario', 'Bienes'];

  useEffect(() => {
    if (objetives === 'Monetario') {
      setShowTextObjetives(true);
    }
  }, [objetives]);

  const initialValues = {
    typeOfObjective: '',
    tags: ['Ayudar'],
    money: '',
    startDate: new Date(),
    endDate: new Date(),
    descriptionOfObjective: 0
  }

  useEffect(() => {
    if (!!event) {
      const loadValues = {
        typeOfObjective: event.event_type.id === 1 ? 'Monetario' : 'Bienes',
        tags: ['Ayudar'],
        money: event.goal,
        startDate: event.init_date,
        endDate: event.end_date,
        descriptionOfObjective: 0
      }
      setFormValues(loadValues)
    }
  }, [event])

  const onDateChange = (value) => {
    const fixedDate = fixDate(value);
    const date = dateFnsFormat(fixedDate, 'yyyy-MM-dd');
    return date;
  };

  const fixDate = (date) => {
    let fixedDate = date ? new Date(date) : null;
    if (fixedDate) {
      fixedDate = new Date(
        fixedDate.getTime() + fixedDate.getTimezoneOffset() * 60000
      );
    }
    return fixedDate;
  };

  const arrangeData = (values) => {
    setData({
      ...data, 
      event_type: values.typeOfObjective === 'Monetario' ? 1 : 0,
      tags: ['Ayudar'],
      goal: !!event ? parseInt(event.goal) : values.money,
      startDate: onDateChange(values.startDate) || event.init_date,
      endDate: onDateChange(values.endDate) || event.end_date,
    })
  };
  
  return (
    <Formik
      enableReinitialize
      initialValues={formValues || initialValues}
      validationSchema={Yup.object().shape({
        typeOfObjective: Yup.string()
          .required('Selecciona un tipo de objetivo')
          .oneOf(objetiveOption),
        tags: Yup.array().notRequired(),
        startDate: Yup.date().default(() => new Date()),
        endDate: Yup.date().when(
          'startDate',
          (startDate, schema) =>  (startDate && schema.min(startDate, 'Fecha fin debe ser posterior a fecha inicio'))
        ),
        money: Yup.number()
          .max(100000000)
          .notRequired()
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Call API to store step data in server session
          // It is important to have it on server to be able to reuse it if user
          // decides to continue later.
          setStatus({ success: true });
          setSubmitting(false);
          arrangeData(values);
          if (onNext) {
            onNext();
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Typography variant="h3" color="textPrimary">
            Objetivo
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
              ¿Cuál es tu objetivo?
            </Typography>
          </Box>
          <Box mt={3}>
            <Box mb={2} display="flex" alignItems="center">
              <TextField
                error={Boolean(
                  touched.typeOfObjective && errors.typeOfObjective
                )}
                fullWidth
                helperText={touched.typeOfObjective && errors.typeOfObjective}
                label="Tipo de objetivo"
                name="typeOfObjective"
                select
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.typeOfObjective}
                variant="outlined"
                SelectProps={{ native: true }}
              >
                <>
                  <option defaultValue="" disabled selected />
                  {objetiveOption.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </>
              </TextField>
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                error={Boolean(touched.money && errors.money)}
                fullWidth
                onKeyPress={event => {
                  if (!/[0-9,]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                type="number"
                helperText={touched.money && errors.money}
                label="Monto"
                name="money"
                onBlur={handleBlur}
                disabled={!!editMode}
                onChange={handleChange}
                value={values.money}
                variant="outlined"
              />
            </Box>
            <Box mt={3} display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Tags"
                type="string"
                name="tags"
                value={tag}
                onChange={event => setTag(event.target.value)}
                variant="outlined"
              />
              <IconButton
                className={classes.addTab}
                onClick={() => {
                  if (!tag) {
                    return;
                  }

                  setFieldValue('tags', [...values.tags, tag]);
                  setTag('');
                }}
              >
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              </IconButton>
            </Box>
            <Box mt={2}>
              {values.tags.map((tag, i) => (
                <Chip
                  variant="outlined"
                  key={i}
                  label={tag}
                  className={classes.tag}
                  onDelete={() => {
                    const newTags = values.tags.filter(t => t !== tag);

                    setFieldValue('tags', newTags);
                  }}
                />
              ))}
            </Box>
            {Boolean(touched.tags && errors.tags) && (
              <Box mt={2}>
                <FormHelperText error>{errors.tags}</FormHelperText>
              </Box>
            )}
            <Box mt={4} display="flex">
              <DatePicker
                className={classes.datePicker}
                inputVariant="outlined"
                format="DD/MM/YYYY"
                label="Fecha de inicio"
                name="startDate"
                okLabel='Aceptar'
                cancelLabel='Cancelar'
                clearLabel='Limpiar'
                onClick={() => setFieldTouched('startDate')}
                onChange={(date) => setFieldValue('startDate', date)}
                value={values.startDate}
              />
              <DatePicker
                className={classes.datePicker}
                label="Fecha Fin"
                name="endDate"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                okLabel='Aceptar'
                cancelLabel='Cancelar'
                clearLabel='Limpiar'
                onClick={() => setFieldTouched('endDate')}
                onChange={(date) => setFieldValue('endDate', date)}
                value={values.endDate}
              />
            </Box>
            {Boolean(touched.startDate && errors.startDate) && (
              <Box mt={2}>
                <FormHelperText error>{errors.startDate}</FormHelperText>
              </Box>
            )}
            {Boolean(touched.endDate && errors.endDate) && (
              <Box mt={2}>
                <FormHelperText error>{errors.endDate}</FormHelperText>
              </Box>
            )}
          </Box>
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
              Siguiente
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

ProjectDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func
};

ProjectDetails.defaultProps = {
  onNext: () => {},
  onBack: () => {}
};

export default ProjectDetails;
