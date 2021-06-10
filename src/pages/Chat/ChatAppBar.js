import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
  title: {
    flexGrow: 1,
  },
}));

const ChatAppBar = () => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                  <IconButton className={classes.menuButton} aria-label="upload picture" component={Link} to='/'>
                      <ArrowBackIcon />
                  </IconButton>    
                  <Typography variant="h6" className={classes.title}>
                    Чат
                  </Typography>
                  <IconButton aria-label="upload picture" style={{color: 'white'}}>
                      <MoreVertIcon />
                  </IconButton>    
              </Toolbar>
          </AppBar>
      </div>
    );
}

export default ChatAppBar
