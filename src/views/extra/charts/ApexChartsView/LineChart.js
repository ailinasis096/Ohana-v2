import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from '../../../../api/Api.js';
import {
  Card,
  CardContent,
  Typography,
  useTheme
} from '@material-ui/core';

const LineChart = () => {
  const theme = useTheme();
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const month = [];
  const donation = [];
  let [donations, setDonations] = useState([]);

  useEffect(() => {
    donar();
  }, []);

  const donar = async () => {
    try {
      const response = await api.getDonationsByMonth();
      setDonations(donations = response);
      arrayDonations();
    } catch (err) {
      console.error(err);
    }
  };

  const arrayDonations = () => {
    donations.map(don => {
      month.push(months[don.month]);
      donation.push(don.donations);
    });

  };

  const chart = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: false
      },
      colors: ['#1f87e6', '#ff5c7c'],
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: theme.palette.divider,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: theme.palette.text.secondary
        }
      },
      markers: {
        size: 4,
        strokeColors: ['#1f87e6', '#27c6db'],
        strokeWidth: 0,
        shape: 'circle',
        radius: 2,
        hover: {
          size: undefined,
          sizeOffset: 2
        }
      },
      stroke: {
        width: 3,
        curve: 'smooth',
        lineCap: 'butt',
        dashArray: [0, 3]
      },
      theme: {
        mode: theme.palette.type
      },
      tooltip: {
        theme: theme.palette.type
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider
        },
        categories: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre'],
        /*categories: month,*/
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: [
        {
          axisBorder: {
            show: true,
            color: theme.palette.divider
          },
          axisTicks: {
            show: true,
            color: theme.palette.divider
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary
            }
          }
        },
        {
          axisTicks: {
            show: true,
            color: theme.palette.divider
          },
          axisBorder: {
            show: true,
            color: theme.palette.divider
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary
            }
          },
          opposite: true
        }
      ]
    },
    series: [
      {
        name: 'user-2',
        /*data: [10, 6, 80, 10]*/
        data: donation
      }
      /* {
         name: 'user-2',
         data: donation
       }*/
    ]
  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant='h4'
          color='textPrimary'
        >
          Donaciones por Usuario

        </Typography>
        <Chart
          type='line'
          height='300'
          {...chart}
        />
      </CardContent>
    </Card>
  );
};


export default LineChart;
