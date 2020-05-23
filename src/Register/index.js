import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useSetToken from '../core/state/hooks/useSetToken';
import BgImage from '../components/BgImage';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles({
  content: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const REGISTER_MUTATION = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const Register = ({ history }) => {
  const classes = useStyles();
  const [alert, setAlert] = useState('');
  const setToken = useSetToken();
  const [register, { loading }] = useMutation(REGISTER_MUTATION);

  const handleErrorAlertClose = () => {
    setAlert('');
  };

  const handleRegister = async (values) => {
    try {
      const { data } = await register({
        variables: values
      });
      if (data) {
        await setToken({
          variables: {
            token: data.createUser.token
          }
        });
        history.push('/');
      }
    } catch (err) {
      if (err) {
        if (
          err.graphQLErrors[0] &&
          err.graphQLErrors[0].extensions.exception &&
          err.graphQLErrors[0].extensions.exception.fields &&
          err.graphQLErrors[0].extensions.exception.fields[0] === 'email'
        ) {
          setAlert('A user already exists with the email!');
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
        <RegisterForm onSubmit={handleRegister} loading={loading} />
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

export default Register;
