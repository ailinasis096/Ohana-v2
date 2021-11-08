import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import {
  Card,
  CardContent,
  Typography,
  useTheme
} from '@material-ui/core';


const RadialChart = () => {
  const theme = useTheme();

  const data = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: false
      },
      colors: ['#FF7514'],
      labels: ['Campañas'],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%'
          },
          dataLabels: {
            name: {
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.primary
            },
            value: {
              color: theme.palette.text.secondary
            }
          },
          track: {
            background: theme.palette.background.dark
          }
        }
      },
      theme: {
        mode: theme.palette.type
      }
    },
    series: [83]
  };

  return (
    <Card>
      <CardContent>
        <Typography
          align='center'
          variant='h4'
          color='textPrimary'
        >
          Mis campañas finalizadas
        </Typography>
        <Chart
          options={data.options}
          series={data.series}
          type='radialBar'
          height='300'
        />

      </CardContent>
    </Card>
  );
};

export default RadialChart;
