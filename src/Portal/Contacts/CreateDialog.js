import React from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ContactFormFields from './ContactFormFields';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required')
});

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400
  },
  title: {
    background: theme.palette.primary.main,
    color: 'white'
  },
  actions: {
    background: theme.palette.grey[100],
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.grey[300]
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }
}));

const CreateDialog = ({ open, loading, onClose, onSubmit }) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{
        paper: classes.paper
      }}
      onClose={onClose}
      open={open}
      disableBackdropClick
    >
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: ''
        }}
        validationSchema={ContactFormSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          values,
          errors,
          touched,
          handleChange,
          handleBlur
        }) => (
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <DialogTitle className={classes.title}>Create contact</DialogTitle>
            <DialogContent>
              <ContactFormFields
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </DialogContent>
            <DialogActions className={classes.actions}>
              <Button onClick={onClose}>Cancel</Button>
              <Button color="primary" variant="contained" type="submit">
                Create
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateDialog;
