import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Formik } from 'formik';
import * as Yup from 'yup';

import LoadingSpinner from '../components/LoadingSpinner';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().min(8, 'Password is too short').required('Required')
});

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: 400,
    padding: 24
  },
  title: {
    textAlign: 'center',
    marginBottom: 20
  },
  actions: {
    marginTop: 24
  },
  link: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
    marginTop: 20
  }
});

const LoginForm = ({ onSubmit, loading }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={onSubmit}
      validationSchema={LoginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Card className={classes.root}>
            <Typography variant="h4" className={classes.title}>
              Demo CRM
            </Typography>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="filled"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="filled"
              autoComplete="off"
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password}
            />
            <div className={classes.actions}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? <LoadingSpinner size={24} /> : 'Login'}
              </Button>
              <Link
                className={classes.link}
                href="/register"
                variant="body2"
                color="textPrimary"
              >
                Register
              </Link>
            </div>
          </Card>
        </form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default LoginForm;
