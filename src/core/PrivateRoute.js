import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useToken from './state/hooks/useToken';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useToken();

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
