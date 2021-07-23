import React, {
    useState
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


  
  const useStyles = makeStyles((theme) => ({
    root: {},
    technology: {
      height: 30,
      '& + &': {
        marginLeft: theme.spacing(1)
      }
    }
  }));
  
  const LatestDonations = ({ className, ...rest }) => {
    const classes = useStyles();
    const [donations, setDonations] = useState([
      {
        id: 1,
        name: 'Omar',
        status: 'Completo',
        total: 50,
        currency: '$'
      },
      {
        id: 2,
        name: 'Florencia',
        status: 'Completo',
        total: 60,
        currency: '$'
      },
      {
        id: 3,
        name: 'Marcos',
        status: 'Completo',
        total: 33,
        currency: '$'
      },
      {
        id: 4,
        name: 'Maria',
        status: 'Completo',
        total: 100,
        currency: '$'
      },
      {
        id: 5,
        name: 'Micalea',
        status: 'Completo',
        total: 85,
        currency: '$'
      }
    ]);
  
    return (
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader
          action={<GenericMoreButton />}
          title="Últimas donaciones"
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
                    sortDirection="desc"
                  >
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Total
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow
                    hover
                    key={donation.id}
                  >
                    <TableCell>
                      {donation.id}
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Box ml={1}>
                          <Typography variant="body2"> Donación de </Typography>  
                          <Typography variant="subtitle2" color='primary'>{donation.name}</Typography> 
                          <Typography variant="body2"> ¡Gracias por ser parte! </Typography> 
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                    <Label
                      className={classes.label}
                      color={donation.status === 'Completo' ? 'success' : 'error'}
                    >
                      {donation.status}
                    </Label>
                    </TableCell>
                    <TableCell>
                      {numeral(donation.total).format(`${donation.currency}0,0.00`)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          p={2}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            component={RouterLink}
            size="small"
            to="/app/projects"
            endIcon={<NavigateNextIcon />}
          >
            Ver todo
          </Button>
        </Box>
      </Card>
    );
  };
  
  LatestDonations.propTypes = {
    className: PropTypes.string
  };
  
  export default LatestDonations;