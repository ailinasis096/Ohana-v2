import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  makeStyles,
  Tab,
  Tabs
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import General from './General';
import Security from './Security';
import API from '../../../api/Api'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const AccountView = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('general');
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await API.getInfoUser();
      setUserData(response);
    } catch (err) {
      console.error(err);
    }
  };

  console.log('userData: ', userData)

  const tabs = [
    { value: 'general', label: 'General' },
    /*{ value: 'subscription', label: 'Subscription' },*/
    /*{ value: 'notifications', label: 'Notificaciones' },*/
    { value: 'security', label: 'Seguridad' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'general' && userData && <General user={userData}/>}
          {/*{currentTab === 'subscription' && <Subscription />}*/}
          {/*{currentTab === 'notifications' && <Notifications />}*/}
          {currentTab === 'security' && <Security />}
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView;
