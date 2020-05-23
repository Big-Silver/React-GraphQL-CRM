import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useToken from './state/hooks/useToken';

const PublicRoute = ({ component: Component, ...rest }) => {
  const token = useToken();
  console.log(token);

  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
