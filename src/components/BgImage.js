import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import background from '../assets/images/bg.jpeg';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    backgroundImage: `url(${background})`,
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.8
  }
});

const BgImage = () => {
  const classes = useStyles();

  return <div className={classes.root} />;
};

export default BgImage;
