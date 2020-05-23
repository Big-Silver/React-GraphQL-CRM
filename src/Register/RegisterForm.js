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

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().min(8, 'Password is too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password does not match')
    .required('Required')
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

const RegisterForm = ({ onSubmit, loading }) => {
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
      validationSchema={RegisterSchema}
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
              name="name"
              label="Name"
              fullWidth
              variant="filled"
              required
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name && touched.name}
            />
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
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="filled"
              autoComplete="off"
              required
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword && touched.confirmPassword}
            />
            <div className={classes.actions}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? <LoadingSpinner size={24} /> : 'Register'}
              </Button>
              <Link
                className={classes.link}
                href="/login"
                variant="body2"
                color="textPrimary"
              >
                Login
              </Link>
            </div>
          </Card>
        </form>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default RegisterForm;
