import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import CreateOrderCart from './CreateOrderCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
  title: {
    flexGrow: 1,
  },
}));

const CreateOrderAppBar = () => {
    const classes = useStyles();

    return (
      <AppBar position="static">
          <Toolbar>
                <IconButton className={classes.menuButton} aria-label="upload picture" component={Link} to='/'>
                    <ArrowBackIcon />
                </IconButton>    
                <Typography variant="h6" className={classes.title}>
                  Создание заказа
                </Typography>
                <CreateOrderCart />
          </Toolbar>
      </AppBar>
    );
}

export default CreateOrderAppBar
