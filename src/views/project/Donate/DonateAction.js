import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Paper,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '50px',
    display: 'flex',
    justifyContent: 'center'
  },
  div: {
    display: 'grid',
    width: '50%'
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    width: '170px',
    height: '75px'
  },
  divs: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-around'
  },
  lastDiv: {}
}));

const DonateAction = ({
                        className,
                        onBack,
                        onComplete,
                        ...rest
                      }) => {
  const classes = useStyles();
  const [selectedButton, setSelectedButton] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [shownValue, setShownValue] = useState();

  const handleClick = (btn, amount) => {
    setSelectedButton(btn);
    setSelectedAmount(amount);
    setShownValue('');
  };

  const handleChange = () => ({ target: { value } }) => {
    setSelectedButton(0);
    setSelectedAmount(value);
    setShownValue(value);
  };

  const isValid = '';

  return (
    <Paper
      elevation={0}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div className={classes.div}>
        <Typography variant='h3' color='textPrimary' className={classes.title}>
          ¿Cuánto querés donar?
        </Typography>
        <Box mt={2} className={classes.divs}>
          <Button
            className={classes.button}
            color={selectedButton === 1 ? 'default' : 'secondary'}
            variant='contained'
            size='large'
            onClick={() => handleClick(1, '50')}
          >
            <Typography variant='h4'>
              $50
            </Typography>
          </Button>
          <Button
            className={classes.button}
            color={selectedButton === 2 ? 'default' : 'secondary'}
            variant='contained'
            size='large'
            onClick={() => handleClick(2, '100')}
          >
            <Typography variant='h4'>
              $100
            </Typography>
          </Button>
        </Box>
        <Box mt={2} className={classes.divs}>
          <Button
            className={classes.button}
            color={selectedButton === 3 ? 'default' : 'secondary'}
            variant='contained'
            size='large'
            onClick={() => handleClick(3, '200')}
          >
            <Typography variant='h4'>
              $200
            </Typography>
          </Button>
          <Button
            className={classes.button}
            color={selectedButton === 4 ? 'default' : 'secondary'}
            variant='contained'
            size='large'
            onClick={() => handleClick(4, '500')}
          >
            <Typography variant='h4'>
              $500
            </Typography>
          </Button>
        </Box>
        <Box mt={2} className={classes.divs}>
          <TextField
            fullWidth
            label='Otro monto'
            name='amount'
            onChange={handleChange()}
            variant='outlined'
            onKeyPress={(event) => {
              if (!/[0-9,]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={shownValue || ''}
            //helperText={(touched.publicKey && (!state.formData.publicKey || state.formData.publicKey === '')) ? 'Ingrese la public key' : null}
            //onFocus={handleTouch('publicKey')}
            //error={}
          />
        </Box>
        <Box mt={6} display='flex' className={classes.lastDiv}>
          {onBack && (
            <Button onClick={onBack} size='large'>
              Cancelar
            </Button>
          )}
          <Box flexGrow={1} />
          <Button
            color='secondary'
            onClick={() =>
              onComplete(selectedAmount)
            }
            type='submit'
            variant='contained'
            size='large'
          >
            Siguiente
          </Button>
        </Box>
      </div>
    </Paper>
  );
};

DonateAction.propTypes = {
  className: PropTypes.string,
  onComplete: PropTypes.func,
  onBack: PropTypes.func
};

DonateAction.defaultProps = {
  onComplete: () => {
  },
  onBack: () => {
  }
};

export default DonateAction;
