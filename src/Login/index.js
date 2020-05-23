import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useSetToken from '../core/state/hooks/useSetToken';
import BgImage from '../components/BgImage';
import LoginForm from './LoginForm';

const useStyles = makeStyles({
  content: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = ({ history }) => {
  const classes = useStyles();
  const [alert, setAlert] = useState('');
  const setToken = useSetToken();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleErrorAlertClose = () => {
    setAlert('');
  };

  const handleLogin = async (values) => {
    try {
      const { data } = await login({
        variables: values
      });
      await setToken({
        variables: {
          token: data.login.token
        }
      });
      history.push('/');
    } catch (err) {
      if (err) {
        if (err.message && err.message.indexOf('Invalid credentials') >= 0) {
          setAlert('Invalid credentials');
        } else {
          setAlert(err.message);
        }
      }
    }
  };

  return (
    <div>
      <BgImage />
      <div className={classes.content}>
        <LoginForm onSubmit={handleLogin} loading={loading} />
        <Snackbar
          open={Boolean(alert)}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          onClose={handleErrorAlertClose}
        >
          <Alert onClose={handleErrorAlertClose} severity="error">
            {alert}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Login;
