import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    paddingTop: 16,
    paddingBottom: 16
  },
  field: {
    marginBottom: 16
  }
});

const ContactFormFields = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        className={classes.field}
        name="name"
        label="Name"
        fullWidth
        variant="outlined"
        autoComplete="off"
        required
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name && touched.name}
      />
      <TextField
        className={classes.field}
        name="email"
        label="Email"
        type="email"
        fullWidth
        variant="outlined"
        required
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email && touched.email}
      />
      <TextField
        className={classes.field}
        name="phone"
        label="Phone"
        fullWidth
        variant="outlined"
        required
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone && touched.phone}
      />
    </div>
  );
};

export default ContactFormFields;
