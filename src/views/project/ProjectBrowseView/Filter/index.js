import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, Chip, Divider, Input, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MultiSelect from './MultiSelect';
import api from '../../../../api/Api';

const useStyles = makeStyles(theme => ({
  root: {},
  searchInput: {
    marginLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const Filter = ({ className, onlyName, fetchEvent, ...rest }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);

  const [chips, setChips] = useState(['Monetaria']);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectOptions([
      {
        label: 'Tipo',
        options: ['Monetaria', 'Fisica']
      },
      {
        label: 'Ubicación',
        options: ['Córdoba', 'Buenos Aires', 'Neuquén', 'Mendoza', 'Salta']
      },
      {
        label: 'Categoría',
        options: categoriesNames
      }
    ])
  }, [categoriesNames]);

  const fetchCategories = async() => {
    let catNames = [];
    try {
      let response = await api.getCategories();
      response.map((category) => 
        catNames.push(category.name)
      )
      setCategoriesNames(catNames);
    } catch (e) {
      console.error(e);
    }
  };
  const handleInputChange = event => {
    event.persist();
    setInputValue(event.target.value);
  };

  const handleInputKeyup = event => {
    event.persist();

    if (event.keyCode === 13 && inputValue) {
      if (!chips.includes(inputValue)) {
        setChips(prevChips => [...prevChips, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleChipDelete = chip => {
    setChips(prevChips => prevChips.filter(prevChip => chip !== prevChip));
  };

  const handleMultiSelectChange = value => {
    setChips(value);
  };

  useEffect(() => {
    fetchEvent(1, 15, inputValue);
  }, [inputValue]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={2} display="flex" alignItems="center">
        <SearchIcon />
        <Input
          disableUnderline
          fullWidth
          className={classes.searchInput}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyup}
          placeholder="Nombre campaña"
          value={inputValue}
        />
      </Box>
      { !onlyName && (
        <div>
          <Divider />
          <Box p={2} display="flex" alignItems="center" flexWrap="wrap">
            {chips.map(chip => (
              <Chip
                className={classes.chip}
                key={chip}
                label={chip}
                onDelete={() => handleChipDelete(chip)}
              />
            ))}
          </Box>
          <Divider />
          <Box display="flex" alignItems="center" flexWrap="wrap" p={1}>
            {selectOptions.map(option => (
              <MultiSelect
                key={option.label}
                label={option.label}
                onChange={handleMultiSelectChange}
                options={option.options}
                value={chips}
              />
            ))}
          </Box>
        </div>
      )}
    </Card>
  );
};

Filter.propTypes = {
  className: PropTypes.string
};

export default Filter;
