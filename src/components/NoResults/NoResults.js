import React from 'react';
import PropTypes from 'prop-types';
import notResultsFound from '../../assets/search2.svg';
import './NoResults.css';
import { Typography } from '@material-ui/core';

const NoResults = ({ title, subtitle }) => {

  return (
    <div
      className="NoResultsMessage"
    >
      <Typography variant="h4"> {title} </Typography> 
      <Typography variant="h4" color='primary'>{subtitle || ''}</Typography>

          <img
            src={notResultsFound}
            alt={title}
            className="NoResultsMessage__NoResultsImage"
          />
      
    </div>
  );
};

NoResults.defaultProps = {
  title: '',
  subtitle: '',
  loading: false,
};

NoResults.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default NoResults;
