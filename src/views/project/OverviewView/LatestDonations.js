import React, {
  useState,
  useEffect
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import numeral from 'numeral';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles,
  Typography
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Label from 'src/components/Label';
import API from '../../../api/Api';
import NoResults from '../../../components/NoResults/NoResults';


const useStyles = makeStyles((theme) => ({
  root: {},
  technology: {
    height: 30,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  msg: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  nameDiv: {
    width: '50%'
  },
}));

const LatestDonations = ({ event, className, ...rest }) => {
  const classes = useStyles();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (event.id) {
      getDonationsByEvent();
    }

  }, []);

  const getDonationsByEvent = async () => {
    try {
      const dona = await API.getDonationsByEvent(event.id);
      setDonations(dona);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatus = (status) => {
    switch (status) {
      case 'accredited': {
        return 'Acreditado';
      }
      case 'refunded': {
        return 'Reintegrado';
      }
      case 'rejected': {
        return 'Rechazado'
      }      
      default: {
        return 'Rechazado';
      }
    }
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {!!donations.results && !!donations.results.length > 0 ?
        <div>
          <CardHeader
            action={<GenericMoreButton />}
            title='Últimas donaciones'
          />
          <Divider />
          <PerfectScrollbar>
            <Box minWidth={900}>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Numero
                    </TableCell>
                    <TableCell>
                      Nombre
                    </TableCell>
                    <TableCell>
                      Estado del pago
                    </TableCell>
                    <TableCell
                      sortDirection='desc'
                    >
                      <Tooltip
                        enterDelay={300}
                        title='Sort'
                      >
                        <TableSortLabel
                          active
                          direction='desc'
                        >
                          Total
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donations.results.map((donation) => (
                    <TableRow
                      hover
                      key={donation.id}
                    >
                      <TableCell>
                        {donation.id}
                      </TableCell>
                      <TableCell>
                        <Box
                          display='flex'
                          alignItems='center'
                        >
                          <Box ml={1} className={classes.nameDiv}>
                            <div className={classes.msg}>
                              <Typography variant='subtitle2' color='primary'> {donation.user}</Typography></div>
                            <Typography variant='body2'> ¡Gracias por tu donación!</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Label
                          className={classes.label}
                          color={donation.status_detail === 'accredited' ? 'success' : 'error'}
                        >
                          {handleStatus(donation.status_detail)}
                        </Label>
                      </TableCell>
                      <TableCell>
                        {numeral(donation.donation[0].unit_price).format(`${'$'}0,0.00`)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>


            </Box>
          </PerfectScrollbar>
          <Box
            p={2}
            display='flex'
            justifyContent='flex-end'
          >
            <Button
              component={RouterLink}
              size='small'
              to='/app/projects'
              endIcon={<NavigateNextIcon />}
            >
              Ver todo
            </Button>
          </Box></div>
        :
        <Box ml={1}>
          <NoResults title={'Esta camapaña no tiene donaciones'} subtitle={'¡Sé el primero!'} />
        </Box>
      }
    </Card>
  );
};

LatestDonations.propTypes = {
  className: PropTypes.string
};

export default LatestDonations;
