import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  makeStyles,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
  Card,
  Box,
  Container
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Calendar as CalendarIcon } from 'react-feather';
import CardEvents from 'src/components/CardEvents';
import api from './../../../api/Api';
import NoResults from './../../../components/NoResults/NoResults';
import CircularProgress from '@material-ui/core/CircularProgress';
import Filter from './../../project/ProjectBrowseView/Filter/index';
import { Alert } from '@material-ui/lab';

const timeRanges = [
  {
    value: 'today',
    text: 'Hoy'
  },
  {
    value: 'yesterday',
    text: 'Ayer'
  },
  {
    value: 'last_30_days',
    text: 'Últimos 30 días'
  },
  {
    value: 'last_year',
    text: 'Último año'
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '1280px',
    padding: '0 24px'
  },
  container: {
    padding: '0',
    marginBottom: '32px'
  },
  card: {
    width: '100%'
  },
  progress: {
    marginTop: '20vh',
    marginLeft: '32vw'
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%'
  }
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();
  const actionRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState(timeRanges[2].text);
  const [mode, setMode] = useState('grid');
  const [events, setEvents] = useState([]);
  const [accountMp, setAccountMp] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvent(1, 10, '');
    fetchMpAccount();
  }, []);

  const fetchEvent = async (pageSize = 1, results = 10, data) => {
    setLoading(true);
    try {
      const response = await api.getMyEvents(pageSize, results, data);
      setEvents(response.results);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMpAccount = async () => {
    try {
      const response = await api.getMpAccount();
      setAccountMp(response);
    } catch (err) {
      console.error(err);
    }
  };

  console.log('accountMp: ', accountMp);
  console.log('!!accountMp: ', !!accountMp);

  return (
    <Container maxWidth='lg'>
      <Grid
        container
        spacing={3}
        justify='space-between'
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Grid item>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            aria-label='breadcrumb'
          >
            <Link
              variant='body1'
              color='inherit'
              to='/app'
              component={RouterLink}
            >
              Dashboard
            </Link>
            <Typography variant='body1' color='textPrimary'>
              Listar
            </Typography>
          </Breadcrumbs>
          <Typography variant='h3' color='textPrimary'>
            Mis Campañas Activas
          </Typography>
        </Grid>
        <Grid item>
          <Button
            ref={actionRef}
            onClick={() => setMenuOpen(true)}
            startIcon={
              <SvgIcon fontSize='small'>
                <CalendarIcon />
              </SvgIcon>
            }
          >
            {timeRange}
          </Button>
          <Menu
            anchorEl={actionRef.current}
            onClose={() => setMenuOpen(false)}
            open={isMenuOpen}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            {timeRanges.map(_timeRange => (
              <MenuItem
                key={_timeRange.value}
                onClick={() => setTimeRange(_timeRange.text)}
              >
                {_timeRange.text}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        <Container className={classes.container} maxWidth='lg'>
          <Box mt={3}>
            <Filter onlyName fetchEvent={fetchEvent} />
            {!!accountMp && accountMp.name === '' && (
              <div className={classes.btnDiv}>
                <Alert severity='warning'>Tus campañas no pueden recibir donaciones porque no has asociado tu cuenta de
                  mercado pago. Podes hacerlo desde
                  <Link href='/app/config-account' underline='hover'>
                    {'este link'}
                  </Link>
                </Alert>
              </div>
            )}
          </Box>
        </Container>

        {!!loading ? (
          <CircularProgress className={classes.progress} color='primary' size={50} />
        ) : (
          !!events && events.length > 0 ? (
            <Grid container spacing={3}>
              {events.map(project => (
                <Grid
                  item
                  key={project.id}
                  md={mode === 'grid' ? 4 : 12}
                  sm={mode === 'grid' ? 6 : 12}
                  xs={12}
                >
                  <CardEvents project={project} userMode={true} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card className={classes.card}>
              <NoResults title={'No se encontraron resultados'} />
            </Card>
          )
        )}
      </Grid>
    </Container>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
