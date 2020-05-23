import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const LoadingSpinner = withStyles({
  root: {
    color: 'white'
  }
})(CircularProgress);

export default LoadingSpinner;
