import React from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: 16
  },
  header: {
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    marginLeft: 8
  },
  detailRow: {
    display: 'flex',
    lineHeight: 32
  },
  label: {
    width: 100,
    textAlign: 'right',
    marginRight: 20
  }
});

const GET_CONTACT = gql`
  query getContact($id: Int!) {
    contact(id: $id) {
      id
      name
      email
      phone
      status
      contactOwner {
        name
      }
    }
  }
`;

const ContactsDetails = ({ history, match }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CONTACT, {
    variables: {
      id: +match.params.id
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <IconButton
          onClick={() => {
            history.goBack();
          }}
        >
          <BackIcon />
        </IconButton>
        <Typography className={classes.title} variant="h5">
          {data.contact.name}
        </Typography>
      </div>
      <div>
        <div className={classes.detailRow}>
          <Typography className={classes.label} color="textSecondary">
            Email:
          </Typography>
          <Typography className={classes.value}>
            {data.contact.email}
          </Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography className={classes.label} color="textSecondary">
            Phone:
          </Typography>
          <Typography className={classes.value}>
            {data.contact.phone}
          </Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography className={classes.label} color="textSecondary">
            Status:
          </Typography>
          <Typography className={classes.value}>
            {data.contact.status}
          </Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography className={classes.label} color="textSecondary">
            Agent:
          </Typography>
          <Typography className={classes.value}>
            {data.contact.contactOwner && data.contact.contactOwner.name}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default ContactsDetails;
