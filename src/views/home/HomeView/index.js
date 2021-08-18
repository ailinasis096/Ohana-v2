import { makeStyles } from '@material-ui/core';
import React from 'react';
import Page from 'src/components/Page';
import CTA from './CTA';
import FAQS from './FAQS';
import Features from './Features';
import Hero from './Hero';
import Testimonials from './Testimonials';

const useStyles = makeStyles(() => ({
  root: {}
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <FAQS />
    </Page>
  );
};

export default HomeView;
