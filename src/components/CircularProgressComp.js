import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > * + *': {
//       marginLeft: theme.spacing(2),
//     },
//   },
// }));

const CircularProgressComp = () => {
    // const classes = useStyles();

    return (
        <div style={styles.container}>
            <CircularProgress />
        </div>
    )
}

const styles = {
  container: {
    // flex: 1,
    // height: '100%',
    // width: '100%',
    backgroundColor: 'red'
  }
}

export default CircularProgressComp
