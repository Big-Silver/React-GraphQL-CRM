import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AppHeader from '../components/AppHeader';
import ContactsList from './Contacts/List';
import ContactsDetails from './Contacts/Details';
import useSetToken from '../core/state/hooks/useSetToken';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: '80px 16px 16px',
    boxSizing: 'border-box'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

const Portal = () => {
  const classes = useStyles();
  const setToken = useSetToken();

  return (
    <div className={classes.root}>
      <AppHeader
        title="Contacts"
        onLogOut={() => {
          setToken({
            variables: {
              token: ''
            }
          });
        }}
      />

      <Switch>
        <Route path="/contacts/list" component={ContactsList} />
        <Route path="/contacts/:id" component={ContactsDetails} />
        <Redirect to="/contacts/list" />
      </Switch>
    </div>
  );
};

export default Portal;
