import React from 'react';
import { Switch, Router, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import history from './core/history';
import client from './core/apollo-client';

import PrivateRoute from './core/PrivateRoute';
import PublicRoute from './core/PublicRoute';

import Login from './Login';
import Register from './Register';
import Portal from './Portal';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PrivateRoute path="/" component={Portal} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
